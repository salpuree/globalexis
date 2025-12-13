import { useEffect, useRef, useState, useCallback, ReactNode } from 'react';
import './HorizontalSnapFlick.css';

interface SlideConfig {
    id: string;
    content: ReactNode;
}

interface HorizontalSnapFlickProps {
    slides: SlideConfig[];
    animationMs?: number;
    showDots?: boolean;
    onSlideChange?: (index: number, slideId: string) => void;
}

export default function HorizontalSnapFlick({
    slides,
    animationMs = 500,
    showDots = true,
    onSlideChange,
}: HorizontalSnapFlickProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [current, setCurrent] = useState(0);
    const lockedRef = useRef(false);

    // Track wheel/touch velocity
    const lastWheelTime = useRef(0);
    const wheelDeltaAcc = useRef(0);
    const touchStartY = useRef<number | null>(null);
    const touchStartTime = useRef(0);
    const touchDeltaAcc = useRef(0);

    const scrollToSlide = useCallback((index: number) => {
        const container = containerRef.current;
        if (!container) return;
        const section = container.children[index] as HTMLElement;
        if (!section) return;

        section.scrollIntoView({ behavior: 'smooth', inline: 'start' });
        setCurrent(index);
    }, []);

    const getCurrentIndex = useCallback(() => {
        const container = containerRef.current;
        if (!container) return 0;
        const scrollLeft = container.scrollLeft;
        const slideWidth = container.offsetWidth;
        return Math.round(scrollLeft / slideWidth);
    }, []);

    const moveSlides = useCallback((delta: number) => {
        if (lockedRef.current) return;

        const now = Date.now();
        const timeDiff = now - lastWheelTime.current;
        lastWheelTime.current = now;

        // Reset accumulator if too much time has passed
        if (timeDiff > 200) {
            wheelDeltaAcc.current = 0;
        }

        // accumulate delta for momentum
        wheelDeltaAcc.current += delta;

        const velocity = Math.abs(wheelDeltaAcc.current) / Math.max(timeDiff, 1);
        let steps = 1;

        // map velocity to slide steps (more conservative)
        if (velocity > 0.5) steps = Math.min(2, Math.ceil(velocity * 2));

        const direction = delta > 0 ? 1 : -1;
        const currentIdx = getCurrentIndex();
        const nextIndex = Math.max(0, Math.min(slides.length - 1, currentIdx + direction * steps));

        if (nextIndex !== currentIdx) {
            lockedRef.current = true;
            scrollToSlide(nextIndex);

            setTimeout(() => {
                lockedRef.current = false;
                wheelDeltaAcc.current = 0;
            }, animationMs);
        }
    }, [slides.length, animationMs, scrollToSlide, getCurrentIndex]);

    // Track current slide on scroll
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const newIndex = getCurrentIndex();
            if (newIndex !== current) {
                setCurrent(newIndex);
                onSlideChange?.(newIndex, slides[newIndex]?.id ?? '');
            }
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, [current, getCurrentIndex]);

    /* ---------- WHEEL / TRACKPAD ---------- */
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onWheel = (e: WheelEvent) => {
            const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
            if (Math.abs(delta) < 10) return;
            e.preventDefault();
            moveSlides(delta);
        };

        container.addEventListener('wheel', onWheel, { passive: false });
        return () => container.removeEventListener('wheel', onWheel);
    }, [moveSlides]);

    /* ---------- TOUCH ---------- */
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY;
            touchStartTime.current = Date.now();
            touchDeltaAcc.current = 0;
        };

        const onTouchMove = (e: TouchEvent) => {
            if (touchStartY.current == null) return;
            const deltaY = touchStartY.current - e.touches[0].clientY;
            touchDeltaAcc.current = deltaY;
        };

        const onTouchEnd = () => {
            if (touchStartY.current == null) return;
            const delta = touchDeltaAcc.current;
            const elapsed = Date.now() - touchStartTime.current;

            // Only trigger if swipe is significant enough
            if (Math.abs(delta) > 30) {
                const velocity = Math.abs(delta) / elapsed;
                let steps = velocity > 0.3 ? Math.min(2, Math.ceil(velocity * 2)) : 1;

                const direction = delta > 0 ? 1 : -1;
                const currentIdx = getCurrentIndex();
                const nextIndex = Math.max(0, Math.min(slides.length - 1, currentIdx + direction * steps));

                scrollToSlide(nextIndex);
            }

            touchStartY.current = null;
            touchDeltaAcc.current = 0;
        };

        container.addEventListener('touchstart', onTouchStart, { passive: true });
        container.addEventListener('touchmove', onTouchMove, { passive: true });
        container.addEventListener('touchend', onTouchEnd, { passive: true });

        return () => {
            container.removeEventListener('touchstart', onTouchStart);
            container.removeEventListener('touchmove', onTouchMove);
            container.removeEventListener('touchend', onTouchEnd);
        };
    }, [slides.length, scrollToSlide, getCurrentIndex]);

    /* ---------- KEYBOARD ---------- */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
                e.preventDefault();
                scrollToSlide(Math.min(current + 1, slides.length - 1));
            }
            if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
                e.preventDefault();
                scrollToSlide(Math.max(current - 1, 0));
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [current, slides.length, scrollToSlide]);

    return (
        <>
            <div className="horizontal-snap-container" ref={containerRef}>
                {slides.map((slide) => (
                    <section key={slide.id} id={slide.id}>
                        {slide.content}
                    </section>
                ))}
            </div>
            {showDots && (
                <div className="snap-dots">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={`snap-dot ${i === current ? 'active' : ''}`}
                            onClick={() => scrollToSlide(i)}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
