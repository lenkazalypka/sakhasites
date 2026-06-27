'use client';
import { useEffect, useRef } from 'react';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01█▓▒░⌬⌖⌗⌀⌁';

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
    let frame = 0;
    let running = false;

    const glitch = () => {
      if (running) return;
      running = true;
      let iter = 0;
      const total = original.length * 2.4;
      const interval = setInterval(() => {
        el.textContent = original
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' ';
            if (i < iter / 2.4) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
        iter++;
        if (iter > total) {
          el.textContent = original;
          clearInterval(interval);
          running = false;
        }
      }, 28);
    };

    // trigger on hover
    const trigger = () => glitch();
    el.addEventListener('mouseenter', trigger);

    // random ambient glitch
    const scheduleAmbient = () => {
      frame = window.setTimeout(() => {
        glitch();
        scheduleAmbient();
      }, 4000 + Math.random() * 8000);
    };
    scheduleAmbient();

    return () => {
      el.removeEventListener('mouseenter', trigger);
      clearTimeout(frame);
    };
  }, [original]);

  const Tag = tag as 'span';
  return (
    <Tag
      ref={ref as React.RefObject<HTMLSpanElement>}
      style={{ cursor: 'default', ...style }}
    >
      {children}
    </Tag>
  );
}
