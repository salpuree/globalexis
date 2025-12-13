import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Hook for enhancing native CSS scroll-snap with keyboard navigation
 * and current slide tracking. The actual scrolling is handled by native
 * CSS scroll-snap - this just adds keyboard support and progress tracking.
 */
export function useSnapScroll(containerRef: React.RefObject<HTMLElement | null>) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionsRef = useRef<HTMLElement[]>([]);

  // Update sections reference when container changes
  useEffect(() => {
    if (containerRef.current) {
      sectionsRef.current = Array.from(containerRef.current.children) as HTMLElement[];
    }
  }, [containerRef]);

  // Track current slide on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const slideWidth = container.offsetWidth;
      const newSlide = Math.round(scrollLeft / slideWidth);
      setCurrentSlide(newSlide);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  // Keyboard navigation
  const scrollToSlide = useCallback((index: number) => {
    const sections = sectionsRef.current;
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const sections = sectionsRef.current;
      if (sections.length === 0) return;

      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        if (currentSlide < sections.length - 1) {
          scrollToSlide(currentSlide + 1);
        }
      }

      if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        if (currentSlide > 0) {
          scrollToSlide(currentSlide - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, scrollToSlide]);

  return { currentSlide, scrollToSlide, totalSlides: sectionsRef.current.length };
}
