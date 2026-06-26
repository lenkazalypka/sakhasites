'use client';

import { useEffect, useRef } from 'react';
import { useLang } from '@/lib/lang-context';
import { PulseDot } from '@/components/ui/PulseDot';

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

          {/* Visual card */}
          <div aria-label="Визуальный макет сайта" style={{
            minHeight: 510, border: '1px solid var(--line2)',
            background: 'linear-gradient(145deg,rgba(244,241,232,.045),rgba(244,241,232,.012))',
            padding: 22, display: 'grid', alignContent: 'space-between', position: 'relative', overflow: 'hidden',
          }} className="hero-visual">
            <div style={{ position: 'absolute', right: -120, top: -140, width: 420, height: 420, borderRadius: '50%', background: 'rgba(215,245,111,.12)', filter: 'blur(2px)' }} />
            <div style={{ position: 'absolute', left: -100, bottom: -130, width: 320, height: 320, borderRadius: '50%', background: 'rgba(125,249,210,.09)', filter: 'blur(2px)' }} />

            <div style={{ position: 'relative', border: '1px solid var(--line)', background: '#090a08', boxShadow: '0 28px 80px rgba(0,0,0,.26)' }}>
              <div style={{ height: 42, borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 7, padding: '0 13px' }}>
                {[0,1,2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />)}
                <span style={{ marginLeft: 10, color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 11 }}>index.html</span>
              </div>
              <div style={{ padding: 22, display: 'grid', gap: 13 }}>
                <div style={{ height: 12, background: 'rgba(244,241,232,.14)', width: '72%' }} />
                <div style={{ height: 12, background: 'rgba(244,241,232,.14)', width: '48%', position: 'relative' }}>
                  <span style={{ display: 'inline-block', width: 7, height: 12, marginLeft: 6, background: 'var(--cyan)', position: 'absolute', right: -14, animation: 'blink 1s step-end infinite' }} />
                </div>
                <div style={{ border: '1px solid var(--line)', background: 'rgba(244,241,232,.035)', padding: 18, display: 'grid', gap: 10 }}>
                  <div style={{ height: 12, background: 'rgba(244,241,232,.14)', width: '88%' }} />
                  <div style={{ height: 12, background: 'rgba(244,241,232,.14)', width: '48%' }} />
                  <div style={{ height: 44, background: 'var(--accent)', width: '46%' }} />
                </div>
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[t('hero.visual1'), t('hero.visual2')].map((label, i) => (
                <div key={i} style={{ border: '1px solid var(--line)', padding: 18, background: 'rgba(13,14,11,.78)' }}>
                  <b style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 24 }}>0{i + 1}</b>
                  <span style={{ color: 'var(--muted)', fontSize: 12, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.09em' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @media(max-width:900px) { .hero-grid { grid-template-columns: 1fr !important; } .hero-proof { grid-template-columns: 1fr !important; } .hero-visual { min-height: 420px !important; } }
        @media(max-width:520px) { .hero-visual { min-height: 360px !important; padding: 16px !important; } }
      `}</style>
    </section>
  );
}
