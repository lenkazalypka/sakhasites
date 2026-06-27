'use client';
import { useEffect, useRef } from 'react';

const CHARS = 'アイウエオ01█▓░⌬⌀';

export function GlitchText({ children, tag = 'span', style }: {
  children: string;
  tag?: 'span' | 'h1' | 'h2' | 'h3';
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const original = children;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let running = false;
    let timer: ReturnType<typeof setInterval>;

    const glitch = () => {
      if (running) return;
      running = true;
      let iter = 0;
      const total = original.length * 2;
      timer = setInterval(() => {
        el.textContent = original
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' ';
            if (i < iter / 2) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
        iter++;
        if (iter > total) {
          el.textContent = original;
          clearInterval(timer);
          running = false;
        }
      }, 32);
    };

    el.addEventListener('mouseenter', glitch);
    return () => { el.removeEventListener('mouseenter', glitch); clearInterval(timer); };
  }, [original]);

  const Tag = tag as 'span';
  return (
    <Tag ref={ref as React.RefObject<HTMLSpanElement>} style={{ cursor: 'default', ...style }}>
      {children}
    </Tag>
  );
}
