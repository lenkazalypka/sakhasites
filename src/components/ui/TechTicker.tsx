'use client';

const STACK = [
  'Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel',
  'React', 'PostgreSQL', 'Edge Functions', 'Figma', 'Node.js',
  'REST API', 'Webhook', 'WhatsApp API', 'SEO', 'Lighthouse 100',
];

export function TechTicker() {
  const items = [...STACK, ...STACK]; // duplicate for seamless loop

  return (
    <div style={{
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      overflow: 'hidden',
      background: 'rgba(244,241,232,.02)',
      position: 'relative',
      contain: 'layout paint',
    }}>
      {/* fade edges */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: 'linear-gradient(90deg, var(--bg), transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: 'linear-gradient(-90deg, var(--bg), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'flex', alignItems: 'center', gap: 0,
        animation: 'ticker-scroll 28s linear infinite',
        whiteSpace: 'nowrap',
        willChange: 'transform',
      }}>
        {items.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
            <span style={{
              padding: '10px 22px',
              fontFamily: 'var(--mono)',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '.1em',
              color: 'rgba(244,241,232,.42)',
              textTransform: 'uppercase',
            }}>
              {item}
            </span>
            <span style={{ color: 'var(--accent)', opacity: .5, fontSize: 8 }}>◆</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker-scroll {
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-50%,0,0); }
        }
      `}</style>
    </div>
  );
}
