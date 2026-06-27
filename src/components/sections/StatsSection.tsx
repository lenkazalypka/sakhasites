'use client';

import { CountUp } from '@/components/ui/CountUp';
import { Reveal } from '@/components/ui/Reveal';

const STATS = [
  { value: 74,   suffix: ' кБ',  label: 'средний вес страницы',  note: 'First Load JS' },
  { value: 100,  suffix: '',     label: 'Lighthouse Performance', note: 'целевой показатель' },
  { value: 3.2,  suffix: ' с',   label: 'среднее время сборки',   note: 'Vercel prod build', decimals: 1 },
  { value: 99.9, suffix: '%',    label: 'uptime Vercel Edge',     note: 'SLA платформы', decimals: 1 },
];

export function StatsSection() {
  return (
    <div style={{
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      background: 'rgba(244,241,232,.012)',
    }}>
      <div style={{ maxWidth: 1480, margin: '0 auto', padding: '0 var(--pad)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderLeft: '1px solid var(--line)',
        }} className="stats-grid">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div style={{
                padding: '36px 28px',
                borderRight: '1px solid var(--line)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* subtle corner mark */}
                <span style={{
                  position: 'absolute', top: 12, right: 14,
                  fontFamily: 'var(--mono)', fontSize: 9,
                  color: 'rgba(215,245,111,.28)', letterSpacing: '.1em',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div style={{
                  fontFamily: 'var(--head)',
                  fontSize: 'clamp(32px, 3.6vw, 52px)',
                  fontWeight: 900,
                  letterSpacing: '-.05em',
                  color: 'var(--text)',
                  lineHeight: 1,
                }}>
                  <CountUp end={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </div>
                <div style={{
                  marginTop: 10,
                  fontFamily: 'var(--mono)',
                  fontSize: 11,
                  color: 'var(--accent)',
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                }}>
                  {s.label}
                </div>
                <div style={{
                  marginTop: 4,
                  fontFamily: 'var(--mono)',
                  fontSize: 10,
                  color: 'var(--muted)',
                }}>
                  {s.note}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.stats-grid{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
    </div>
  );
}
