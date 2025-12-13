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
  const touchStartTime = useRef(0);

  const maxIndex = SLIDES.length - 1;

  const move = (dir: 1 | -1) => {
    if (lockedRef.current) return;

    if ((index === 0 && dir === -1) || (index === maxIndex && dir === 1)) {
      return;
    }

    lockedRef.current = true;
    setIndex(i => i + dir);

    setTimeout(() => {
      lockedRef.current = false;
    }, reducedMotion ? 0 : ANIMATION_MS);
  };

  /* URL sync */
  useEffect(() => {
    history.pushState({ index }, '', `/slide/${index}`);
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

  /* reduced motion */
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    mq.addEventListener('change', () => setReducedMotion(mq.matches));
  }, []);

  /* wheel */
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 30) return;
      e.preventDefault();
      move(e.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [index]);

  /* keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        move(1);
      }
      if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        move(-1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index]);

  /* touch */
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchStartY.current == null) return;

      const deltaY = touchStartY.current - e.touches[0].clientY;
      const time = Date.now() - touchStartTime.current;

      if (Math.abs(deltaY) > TOUCH_THRESHOLD || time < 200) {
        move(deltaY > 0 ? 1 : -1);
        touchStartY.current = null;
      }
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
          transition: reducedMotion ? 'none' : `transform ${ANIMATION_MS}ms ease`
        }}
      >
        {SLIDES.map(s => (
          <section key={s.id} style={{ ...styles.slide, background: s.color }}>
            {s.label}
          </section>
        ))}
      </div>

      <div style={styles.dots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{ ...styles.dot, opacity: i === index ? 1 : 0.4 }}
          />
        ))}
      </div>
    </div>
  );
}

/* styles */
const styles: Record<string, CSSProperties> = {
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
