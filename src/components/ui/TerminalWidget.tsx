'use client';

import { useEffect, useRef, useState } from 'react';

interface TermLine {
  type: 'cmd' | 'out' | 'blank' | 'comment';
  text: string;
  delay?: number;
}

const LINES: TermLine[] = [
  { type: 'comment', text: '# инициализация проекта', delay: 400 },
  { type: 'cmd',     text: 'git init sakhasites-client', delay: 900 },
  { type: 'out',     text: 'Initialized empty Git repository', delay: 1300 },
  { type: 'blank',   text: '', delay: 1500 },
  { type: 'cmd',     text: 'npm create next-app@latest .', delay: 1700 },
  { type: 'out',     text: '✔ TypeScript · Tailwind · App Router', delay: 2400 },
  { type: 'blank',   text: '', delay: 2600 },
  { type: 'comment', text: '# структура и дизайн', delay: 2800 },
  { type: 'cmd',     text: 'npx figma-tokens export --theme dark', delay: 3100 },
  { type: 'out',     text: '→ design-tokens.json  (42 vars)', delay: 3700 },
  { type: 'blank',   text: '', delay: 3900 },
  { type: 'cmd',     text: 'npm run build', delay: 4100 },
  { type: 'out',     text: '✔ Compiled in 3.2s  (First Load 74 kB)', delay: 5200 },
  { type: 'blank',   text: '', delay: 5400 },
  { type: 'cmd',     text: 'vercel --prod', delay: 5600 },
  { type: 'out',     text: '🚀 Deployed  →  sakha.site', delay: 6600 },
];

export function TerminalWidget() {
  const [visible, setVisible] = useState<number>(0);
  const [cursor, setCursor] = useState(true);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), line.delay ?? i * 300));
    });
    const loopDelay = (LINES[LINES.length - 1].delay ?? 0) + 3000;
    timers.push(setTimeout(() => setVisible(0), loopDelay));
    timers.push(setTimeout(() => setVisible(0), loopDelay + 100));
    return () => timers.forEach(clearTimeout);
  }, [visible === 0 ? visible : undefined]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (visible !== 0) return;
    const t = setTimeout(() => setVisible(1), 600);
    const timers: ReturnType<typeof setTimeout>[] = [t];
    LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), 600 + (line.delay ?? i * 300)));
    });
    const loopDelay = 600 + (LINES[LINES.length - 1].delay ?? 0) + 3000;
    timers.push(setTimeout(() => setVisible(0), loopDelay));
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  // Скроллим только внутри контейнера терминала, не всю страницу
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [visible]);

  useEffect(() => {
    const id = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(id);
  }, []);

  const shown = LINES.slice(0, visible);

  return (
    <div style={{
      border: '1px solid var(--line2)',
      background: '#070808',
      fontFamily: 'var(--mono)',
      fontSize: 12,
      lineHeight: 1.7,
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,.13) 3px, rgba(0,0,0,.13) 4px)',
      }} />

      {/* title bar */}
      <div style={{
        height: 38, borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center',
        gap: 7, padding: '0 13px', background: 'rgba(244,241,232,.03)',
      }}>
        {['#d7f56f','#7df9d2','rgba(244,241,232,.3)'].map((c, i) => (
          <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: c, flexShrink: 0 }} />
        ))}
        <span style={{ marginLeft: 10, color: 'var(--muted)', fontSize: 10, letterSpacing: '.08em' }}>
          bash — ~/client-project
        </span>
        <span style={{ marginLeft: 'auto', color: 'rgba(125,249,210,.5)', fontSize: 10 }}>
          ● live
        </span>
      </div>

      {/* body — overflow scroll внутри, не снаружи */}
      <div
        ref={bodyRef}
        style={{ padding: '16px 18px', minHeight: 220, maxHeight: 260, overflowY: 'auto', position: 'relative', zIndex: 1 }}
      >
        {shown.map((line, i) => {
          if (line.type === 'blank') return <div key={i} style={{ height: 8 }} />;
          if (line.type === 'comment') return (
            <div key={i} style={{ color: 'rgba(125,249,210,.38)', fontSize: 11 }}>{line.text}</div>
          );
          if (line.type === 'cmd') return (
            <div key={i} style={{ display: 'flex', gap: 8 }}>
              <span style={{ color: 'var(--accent)', userSelect: 'none' }}>$</span>
              <span style={{ color: 'var(--text)' }}>{line.text}</span>
            </div>
          );
          return (
            <div key={i} style={{ color: 'var(--muted)', paddingLeft: 16, fontSize: 11 }}>{line.text}</div>
          );
        })}
        {visible > 0 && visible <= LINES.length && (
          <span style={{
            display: 'inline-block', width: 6, height: 13, background: cursor ? 'var(--accent)' : 'transparent',
            verticalAlign: 'middle', marginLeft: 4, transition: 'background .1s',
          }} />
        )}
      </div>
    </div>
  );
}
