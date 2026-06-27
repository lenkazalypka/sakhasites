'use client';

import { useEffect, useRef } from 'react';

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Убеждаемся что элемент в скрытом состоянии (CSS data-reveal уже делает это)
    // Добавляем transition через JS только сейчас — не мешает initial render
    el.style.transition = 'opacity .6s cubic-bezier(.2,.8,.2,1), transform .6s cubic-bezier(.2,.8,.2,1)';

    // rAF гарантирует что браузер уже смонтировал элемент в скрытом состоянии
    // прежде чем мы начнём наблюдать за ним
    const raf = requestAnimationFrame(() => {
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute('data-reveal', 'done');
          obs.disconnect();
        }
      }, {
        threshold: 0.05,
        rootMargin: '0px',
      });

      obs.observe(el);
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return ref;
}
