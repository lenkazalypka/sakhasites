'use client';

import { useEffect, useRef } from 'react';
import { useLang } from '@/lib/lang-context';
import { PulseDot } from '@/components/ui/PulseDot';
import { TerminalWidget } from '@/components/ui/TerminalWidget';

export function HeroSection() {
  const { t } = useLang();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      hero.style.setProperty('--my', (e.clientY - r.top) + 'px');
    };
    hero.addEventListener('pointermove', onMove);
    return () => hero.removeEventListener('pointermove', onMove);
  }, []);

  const title = t('hero.title');
  const accent = t('hero.titleAccent');
  const titleHtml = title.replace(accent, `<span style="color:var(--accent)">${accent}</span>`);

  return (
    <section
      ref={heroRef}
      id="home"
      style={{
        minHeight: '92svh', paddingTop: 128, paddingBottom: 96, paddingLeft: 'var(--pad)', paddingRight: 'var(--pad)',
        display: 'grid', alignItems: 'center', overflow: 'hidden', position: 'relative',
      }}
    >
      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(transparent 0, rgba(255,255,255,.022) 1px, transparent 1px), linear-gradient(90deg, transparent 0, rgba(255,255,255,.022) 1px, transparent 1px)',
        backgroundSize: '84px 84px', maskImage: 'linear-gradient(#000, transparent 82%)', pointerEvents: 'none',
      }} />
      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(560px circle at var(--mx, 70%) var(--my, 28%), rgba(125,249,210,.1), transparent 65%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1480, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.08fr) minmax(340px,.92fr)', gap: 'clamp(34px,6vw,88px)', alignItems: 'center' }} className="hero-grid">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' }}>
              <PulseDot />
              <span>{t('hero.eyebrow')}</span>
            </div>

            <h1 style={{ maxWidth: 1040, margin: '26px 0 24px', fontSize: 'clamp(42px,6.1vw,88px)', fontWeight: 900, fontFamily: 'var(--head)', letterSpacing: '-.045em', lineHeight: 1 }}
              dangerouslySetInnerHTML={{ __html: titleHtml }} />

            <p style={{ maxWidth: 720, color: 'rgba(244,241,232,.73)', fontSize: 'clamp(17px,1.55vw,22px)', lineHeight: 1.4 }}>
              {t('hero.lead')}
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 30 }}>
              <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '12px 18px', background: 'var(--accent)', border: '1px solid var(--accent)', color: '#111', fontFamily: 'var(--head)', fontSize: 11, fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase' }}>
                {t('hero.primary')}
              </a>
              <a href="#cases" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '12px 18px', background: 'rgba(244,241,232,.035)', border: '1px solid var(--line2)', color: 'var(--text)', fontFamily: 'var(--head)', fontSize: 11, fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase' }}>
                {t('hero.secondary')}
              </a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 32, maxWidth: 760 }} aria-label="Короткие преимущества" className="hero-proof">
              {[
                [t('hero.proof1Title'), t('hero.proof1Text')],
                [t('hero.proof2Title'), t('hero.proof2Text')],
                [t('hero.proof3Title'), t('hero.proof3Text')],
              ].map(([title, text]) => (
                <div key={title} style={{ border: '1px solid var(--line)', background: 'rgba(244,241,232,.025)', padding: 18 }}>
                  <b style={{ display: 'block', marginBottom: 7, color: 'var(--text)', fontFamily: 'var(--head)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em' }}>{title}</b>
                  <span style={{ color: 'var(--muted)', fontSize: 13 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal card — right column */}
          <div className="hero-visual" style={{ display: 'grid', gap: 12 }}>
            {/* glows behind terminal */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', right: -80, top: -80, width: 340, height: 340, borderRadius: '50%', background: 'rgba(215,245,111,.09)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
              <div style={{ position: 'absolute', left: -60, bottom: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(125,249,210,.07)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <TerminalWidget />
              </div>
            </div>

            {/* two metric chips below terminal */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'STACK', value: 'Next.js + Supabase' },
                { label: 'DEPLOY', value: 'Vercel Edge · CI/CD' },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  border: '1px solid var(--line)', padding: '14px 16px',
                  background: 'rgba(13,14,11,.78)',
                }}>
                  <b style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 5 }}>{label}</b>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--cyan)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @media(max-width:900px) { .hero-grid { grid-template-columns: 1fr !important; } .hero-proof { grid-template-columns: 1fr !important; } .hero-visual { min-height: unset !important; } }
        @media(max-width:520px) { .hero-visual { padding: 0 !important; } }
      `}</style>
    </section>
  );
}
