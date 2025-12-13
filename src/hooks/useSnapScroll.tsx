import { useEffect, useState, useRef } from 'react';

export function HorizontalSnapScroll(totalSlides: number) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const currentSlideRef = useRef(0);

  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrollingRef.current) {
        return;
      }

      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTimeRef.current;

      if (timeSinceLastScroll < 4000) {
        return;
      }

      lastScrollTimeRef.current = now;
      isScrollingRef.current = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      setCurrentSlide(prevSlide => {
        const nextSlide = Math.max(0, Math.min(totalSlides - 1, prevSlide + direction));
        return nextSlide;
      });

      wheelTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 4000);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, [totalSlides]);

  return currentSlide;
}
