'use client';
import { useEffect, useRef } from 'react';

const COLS_CHARS = 'アイウエカキク01▓░⌬⌀';

export function MatrixRain({ opacity = 0.18 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const fontSize = 13;
    let drops: number[] = [];
    let visible = false;
    let rafId = 0;
    let lastTime = 0;
    const FPS = 18; // low fps — barely noticeable but way cheaper
    const INTERVAL = 1000 / FPS;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.floor(canvas.width / fontSize);
      drops = Array(cols).fill(1);
      ctx.fillStyle = '#0d0e0b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (now: number) => {
      if (!visible) { rafId = requestAnimationFrame(draw); return; }
      if (now - lastTime < INTERVAL) { rafId = requestAnimationFrame(draw); return; }
      lastTime = now;

      ctx.fillStyle = 'rgba(13,14,11,0.14)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const ch = COLS_CHARS[Math.floor(Math.random() * COLS_CHARS.length)];
        const y = drops[i] * fontSize;
        const frac = y / canvas.height;
        ctx.fillStyle = frac < 0.12
          ? `rgba(215,245,111,${opacity * 2})`
          : `rgba(125,249,210,${opacity * (1 - frac * 0.4)})`;
        ctx.fillText(ch, i * fontSize, y);
        if (y > canvas.height && Math.random() > 0.97) drops[i] = 0;
        drops[i]++;
      }
      rafId = requestAnimationFrame(draw);
    };

    // pause when scrolled offscreen
    const obs = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    obs.observe(canvas);

    rafId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); obs.disconnect(); };
  }, [opacity]);

  return (
    <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity }} />
  );
}
