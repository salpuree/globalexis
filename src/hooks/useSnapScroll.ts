import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

const SLIDES = [
  { id: 0, color: '#111', label: 'Slide 1' },
  { id: 1, color: '#222', label: 'Slide 2' },
  { id: 2, color: '#333', label: 'Slide 3' },
  { id: 3, color: '#444', label: 'Slide 4' }
];

const ANIMATION_MS = 700;
const TOUCH_THRESHOLD = 50;

export default function HorizontalSnapScroll() {
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const lockedRef = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);

  const maxIndex = SLIDES.length - 1;

  /* ---------- MOVE ---------- */
  const move = (dir: 1 | -1) => {
    if (lockedRef.current) return;

    const next = Math.max(0, Math.min(maxIndex, index + dir));

    // allow normal scroll after last slide
    if (index === maxIndex && dir === 1) return;
    if (index === 0 && dir === -1) return;

    lockedRef.current = true;
    setIndex(next);

    setTimeout(() => {
      lockedRef.current = false;
    }, reducedMotion ? 0 : ANIMATION_MS);
  };

  /* ---------- URL SYNC ---------- */
  useEffect(() => {
    const path = `/slide/${index}`;
    window.history.pushState({ index }, '', path);
  }, [index]);

  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      if (typeof e.state?.index === 'number') {
        setIndex(e.state.index);
      }
    };

    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  /* ---------- REDUCED MOTION ---------- */
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);

    const listener = () => setReducedMotion(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  /* ---------- WHEEL ---------- */
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (index === 0 && e.deltaY < 0) return;
      if (index === maxIndex && e.deltaY > 0) return;

      e.preventDefault();
      if (Math.abs(e.deltaY) < 30) return;

      move(e.deltaY > 0 ? 1 : -1);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [index]);

  /* ---------- KEYBOARD ---------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.key === 'ArrowDown' ||
        e.key === 'ArrowRight' ||
        e.key === 'PageDown' ||
        e.key === ' '
      ) {
        e.preventDefault();
        move(1);
      }

      if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowLeft' ||
        e.key === 'PageUp'
      ) {
        e.preventDefault();
        move(-1);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index]);

  /* ---------- TOUCH (INERTIAL) ---------- */
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null) return;

      const deltaY = touchStartY.current - e.touches[0].clientY;
      const time = Date.now() - touchStartTime.current;

      // quick flick or long drag
      const isIntent =
        Math.abs(deltaY) > TOUCH_THRESHOLD || time < 200;

      if (!isIntent) return;

      move(deltaY > 0 ? 1 : -1);
      touchStartY.current = null;
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [index]);

  return (
    <div style={styles.viewport}>
      <div
        style={{
          ...styles.track,
          transform: `translateX(-${index * 100}vw)`,
          transition: reducedMotion
            ? 'none'
            : `transform ${ANIMATION_MS}ms ease`
        }}
      >
        {SLIDES.map(slide => (
          <section
            key={slide.id}
            style={{ ...styles.slide, background: slide.color }}
          >
            {slide.label}
          </section>
        ))}
      </div>

      {/* PROGRESS DOTS */}
      <div style={styles.dots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{
              ...styles.dot,
              opacity: i === index ? 1 : 0.4
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const styles: Record<string, React.CSSProperties> = {

  viewport: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    touchAction: 'pan-y'
  },
  track: {
    display: 'flex',
    width: '100vw',
    height: '100vh'
  },
  slide: {
    width: '100vw',
    height: '100vh',
    flexShrink: 0,
    color: '#fff',
    fontSize: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dots: {
    position: 'fixed',
    bottom: 20,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: 10
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    border: 'none',
    background: '#fff',
    cursor: 'pointer'
  }
};
