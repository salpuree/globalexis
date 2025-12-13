import { useEffect, useState, useRef } from 'react';

export function useSnapScroll(totalSlides: number) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTimeRef.current;

      if (timeSinceLastScroll < 1200 || isScrollingRef.current) {
        return;
      }

      lastScrollTimeRef.current = now;
      isScrollingRef.current = true;

      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      setCurrentSlide(prevSlide => {
        const nextSlide = Math.max(0, Math.min(totalSlides - 1, prevSlide + direction));
        return nextSlide;
      });

      wheelTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1200);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, [currentSlide, totalSlides]);

  return currentSlide;
}
