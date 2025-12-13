import { useEffect, useState, useRef } from 'react';

export function useSnapScroll(totalSlides: number) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrollingRef.current) return;

      isScrollingRef.current = true;

      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }

      const direction = e.deltaY > 0 ? 1 : -1;
      const nextSlide = Math.max(0, Math.min(totalSlides - 1, currentSlide + direction));

      setCurrentSlide(nextSlide);

      wheelTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
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
