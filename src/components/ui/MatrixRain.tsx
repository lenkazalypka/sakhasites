'use client';
import { useEffect, useRef } from 'react';

const COLS_CHARS = 'アイウエカキクサシスタチ01アウエ▓░⌬⌀';

export function MatrixRain({ opacity = 0.18 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const fontSize = 11;
    let cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);

    const draw = () => {
      cols = Math.floor(canvas.width / fontSize);
      ctx.fillStyle = 'rgba(13,14,11,0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const ch = COLS_CHARS[Math.floor(Math.random() * COLS_CHARS.length)];
        // accent on leading char
        const y = drops[i] * fontSize;
        const frac = y / canvas.height;
        ctx.fillStyle = frac < 0.15
          ? `rgba(215,245,111,${opacity * 2.2})`
          : `rgba(125,249,210,${opacity * (1 - frac * 0.5)})`;
        ctx.fillText(ch, i * fontSize, y);

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const id = setInterval(draw, 60);
    return () => { clearInterval(id); ro.disconnect(); };
  }, [opacity]);

  return (
    <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity }} />
  );
}
