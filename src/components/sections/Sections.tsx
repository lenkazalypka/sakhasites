'use client';

import { useLang } from '@/lib/lang-context';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { PulseDot } from '@/components/ui/PulseDot';

const S: React.CSSProperties = { padding: '96px var(--pad)', borderTop: '1px solid var(--line)', position: 'relative' };
const Shell: React.CSSProperties = { maxWidth: 1480, margin: '0 auto' };
const SectionHead = ({ left, right }: { left: React.ReactNode; right?: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: right ? 'minmax(0,1fr) minmax(280px,540px)' : '1fr', gap: 40, alignItems: 'start', marginBottom: 42 }} className="section-head">
    <div>{left}</div>
    {right && <p style={{ color: 'rgba(244,241,232,.66)', fontSize: 16 }}>{right}</p>}
    <style>{`@media(max-width:900px){.section-head{grid-template-columns:1fr!important;}}`}</style>
  </div>
);

export function ServicesSection() {
  const { t, d } = useLang();
  return (
    <section id="services" style={S}>
      <div style={Shell}>
        <Reveal>
          <SectionHead
            left={<><Eyebrow>{t('services.eyebrow')}</Eyebrow><h2 style={{ fontFamily: 'var(--head)', fontSize: 'clamp(31px,4.3vw,58px)', fontWeight: 900, letterSpacing: '-.045em', lineHeight: 1, marginTop: 18 }}>{t('services.title')}</h2></>}
            right={t('services.text')}
          />
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1.08fr .96fr .96fr', gap: 14 }} className="services-grid">
          {d.services.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.05}>
              <div style={{ border: '1px solid var(--line)', background: 'rgba(244,241,232,.025)', padding: 30, minHeight: 210, gridColumn: i === 0 ? 'span 2' : undefined, transition: '.25s cubic-bezier(.2,.8,.2,1)' }} className="card">
                <div style={{ marginBottom: 18, color: 'rgba(215,245,111,.74)', fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '.14em' }}>{s.num}</div>
                <h3 style={{ fontFamily: 'var(--head)', fontSize: 20, fontWeight: 800, letterSpacing: '-.045em', marginBottom: 12 }}>{s.title}</h3>
                <p style={{ color: 'rgba(244,241,232,.66)', fontSize: 14, marginBottom: 16 }}>{s.desc}</p>
                <ul style={{ display: 'grid', gap: 10, listStyle: 'none' }}>
                  {s.list.map(item => (
                    <li key={item} style={{ display: 'flex', gap: 9, color: 'rgba(244,241,232,.66)', fontSize: 14 }}>
                      <span style={{ width: 6, height: 6, marginTop: 8, background: 'var(--accent)', borderRadius: '50%', flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
          <style>{`@media(max-width:900px){.services-grid{grid-template-columns:1fr!important;}.card{grid-column:auto!important;}}`}</style>
        </div>
      </div>
    </section>
  );
}

export function CasesSection() {
  const { t, d } = useLang();
  return (
    <section id="cases" style={S}>
      <div style={Shell}>
        <Reveal>
          <SectionHead
            left={<><Eyebrow>{t('cases.eyebrow')}</Eyebrow><h2 style={{ fontFamily: 'var(--head)', fontSize: 'clamp(31px,4.3vw,58px)', fontWeight: 900, letterSpacing: '-.045em', lineHeight: 1, marginTop: 18 }}>{t('cases.title')}</h2></>}
            right={t('cases.text')}
          />
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 14 }} className="cases-grid">
          {d.cases.map((c, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <article style={{
                minHeight: c.large ? 430 : 520, border: '1px solid var(--line)', background: 'rgba(244,241,232,.024)',
                display: 'grid', gridColumn: c.large ? 'span 2' : undefined,
                gridTemplateColumns: c.large ? '1.05fr .95fr' : undefined,
                gridTemplateRows: c.large ? 'auto' : '260px 1fr', overflow: 'hidden',
              }} className={`case ${c.large ? 'case-large' : ''}`}>
                <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg,#11130d,#1a1d14)' }}>
                  <div style={{ position: 'absolute', inset: 28, border: '1px solid rgba(244,241,232,.12)' }} />
                  <div style={{ position: 'absolute', border: '1px solid rgba(244,241,232,.22)', background: '#080907', boxShadow: '0 22px 60px rgba(0,0,0,.3)', ...(c.large ? { left: 44, right: 92, top: 58, height: 178 } : { left: 54, right: 54, bottom: 50, height: 155 }) }}>
                    <div style={{ height: 28, borderBottom: '1px solid rgba(244,241,232,.12)', background: 'rgba(244,241,232,.035)' }} />
                    <div style={{ padding: 18, display: 'grid', gap: 10 }}>
                      <span style={{ display: 'block', height: 9, background: 'rgba(244,241,232,.13)' }} />
                      <span style={{ display: 'block', height: 9, background: 'rgba(244,241,232,.13)', width: '66%' }} />
                      <span style={{ display: 'block', height: 34, background: 'var(--accent)', width: '44%' }} />
                    </div>
                  </div>
                </div>
                <div style={{ padding: 30 }}>
                  <span style={{ display: 'inline-flex', marginBottom: 16, color: '#111', background: 'var(--accent)', padding: '7px 10px', fontSize: 10, fontWeight: 700, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.12em' }}>{c.kind}</span>
                  <h3 style={{ fontFamily: 'var(--head)', fontSize: 'clamp(25px,3vw,42px)', fontWeight: 800, letterSpacing: '-.045em', marginBottom: 14 }}>{c.title}</h3>
                  <dl style={{ display: 'grid', gap: 9 }}>
                    {([['task', c.task], ['done', c.done], ['result', c.result]] as const).map(([key, val]) => (
                      <div key={key}>
                        <dt style={{ color: 'var(--accent)', fontFamily: 'var(--head)', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.12em' }}>{t(`case.${key}`)}</dt>
                        <dd style={{ color: 'rgba(244,241,232,.66)', fontSize: 14 }}>{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <style>{`@media(max-width:900px){.cases-grid{grid-template-columns:1fr!important;}.case{grid-column:auto!important;grid-template-columns:1fr!important;grid-template-rows:230px 1fr!important;min-height:auto!important;}}`}</style>
      </div>
    </section>
  );
}

export function PricingSection() {
  const { t, d } = useLang();
  return (
    <section id="pricing" style={S}>
      <div style={Shell}>
        <Reveal>
          <SectionHead
            left={<><Eyebrow>{t('pricing.eyebrow')}</Eyebrow><h2 style={{ fontFamily: 'var(--head)', fontSize: 'clamp(31px,4.3vw,58px)', fontWeight: 900, letterSpacing: '-.045em', lineHeight: 1, marginTop: 18 }}>{t('pricing.title')}</h2></>}
            right={t('pricing.text')}
          />
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 14 }} className="pricing-grid">
          {d.pricing.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.05}>
              <div style={{ border: '1px solid var(--line)', background: 'rgba(244,241,232,.025)', padding: 30, minHeight: 210, gridColumn: i === 2 ? '1 / -1' : undefined }} className={i === 2 ? 'pricing-full' : ''}>
                <div style={{ color: 'rgba(215,245,111,.74)', fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '.14em', marginBottom: 18 }}>{p.num}</div>
                <h3 style={{ fontFamily: 'var(--head)', fontSize: 20, fontWeight: 800, letterSpacing: '-.045em' }}>{p.title}</h3>
                <div style={{ margin: '18px 0 8px', color: 'var(--text)', fontFamily: 'var(--head)', fontSize: 'clamp(30px,3.4vw,44px)', fontWeight: 900, letterSpacing: '-.06em', whiteSpace: 'nowrap' }}>{p.price}</div>
                <p style={{ color: 'rgba(244,241,232,.66)', fontSize: 14, marginBottom: 8 }}>{p.desc}</p>
                <p style={{ color: 'var(--muted)', fontSize: 13 }}>{p.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div style={{ marginTop: 18, border: '1px solid var(--line)', background: 'rgba(244,241,232,.02)', padding: 22 }}>
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, listStyle: 'none' }} className="addons-list">
              {d.addons.map(a => <li key={a} style={{ color: 'rgba(244,241,232,.66)', fontSize: 14 }}>{a}</li>)}
            </ul>
          </div>
        </Reveal>
        <style>{`@media(max-width:900px){.pricing-grid{grid-template-columns:1fr!important;}.pricing-full{grid-column:auto!important;}.addons-list{grid-template-columns:1fr!important;}}`}</style>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const { t, d } = useLang();
  return (
    <section id="process" style={S}>
      <div style={Shell}>
        <Reveal>
          <SectionHead
            left={<><Eyebrow>{t('process.eyebrow')}</Eyebrow><h2 style={{ fontFamily: 'var(--head)', fontSize: 'clamp(31px,4.3vw,58px)', fontWeight: 900, letterSpacing: '-.045em', lineHeight: 1, marginTop: 18 }}>{t('process.title')}</h2></>}
            right={t('process.text')}
          />
        </Reveal>
        <div style={{ counterReset: 'step', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: '1px solid var(--line)' }} className="process-grid">
          {d.process.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.05}>
              <div style={{ padding: 28, borderRight: i < 3 ? '1px solid var(--line)' : undefined, background: 'rgba(244,241,232,.02)' }} className="step">
                <b style={{ display: 'block', marginBottom: 36, color: 'var(--accent)', fontFamily: 'var(--head)', fontSize: 12, letterSpacing: '.14em' }}>{p.num}</b>
                <h3 style={{ fontFamily: 'var(--head)', fontSize: 20, fontWeight: 800, letterSpacing: '-.045em' }}>{p.title}</h3>
                <p style={{ marginTop: 10, color: 'rgba(244,241,232,.66)', fontSize: 14 }}>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <style>{`@media(max-width:900px){.process-grid{grid-template-columns:1fr!important;border:0!important;gap:12px!important;}.step{border:1px solid var(--line)!important;}}`}</style>
      </div>
    </section>
  );
}

export function AdminSection() {
  const { t } = useLang();
  return (
    <section id="admin" style={{ ...S, background: '#10110e' }}>
      <div style={Shell}>
        <Reveal>
          <SectionHead
            left={<><Eyebrow>{t('admin.eyebrow')}</Eyebrow><h2 style={{ fontFamily: 'var(--head)', fontSize: 'clamp(31px,4.3vw,58px)', fontWeight: 900, letterSpacing: '-.045em', lineHeight: 1, marginTop: 18 }}>{t('admin.title')}</h2></>}
            right={t('admin.text')}
          />
        </Reveal>
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr .75fr', gap: 14 }} className="admin-grid">
            {/* Mock admin screen */}
            <div style={{ border: '1px solid var(--line)', background: '#090a08', boxShadow: '0 0 0 1px rgba(125,249,210,.06), 0 30px 60px rgba(0,0,0,.3)' }} aria-hidden="true">
              <div style={{ height: 44, borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px' }}>
                {[0,1,2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)' }} />)}
                <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--cyan)', fontFamily: 'var(--mono)', fontSize: 11 }}>
                  <PulseDot />supabase: connected
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', minHeight: 340 }}>
                <div style={{ borderRight: '1px solid var(--line)', padding: 16, display: 'grid', alignContent: 'start', gap: 9 }}>
                  {['статьи', 'услуги', 'кейсы', 'faq', 'заявки'].map((item, i) => (
                    <span key={item} style={{ padding: '9px 10px', background: i === 0 ? 'var(--accent)' : 'rgba(244,241,232,.05)', color: i === 0 ? '#111' : 'var(--muted)', fontSize: 11, fontFamily: 'var(--mono)', fontWeight: i === 0 ? 900 : 400 }}>{item}</span>
                  ))}
                </div>
                <div style={{ padding: 20, display: 'grid', gap: 12, alignContent: 'start' }}>
                  {[['заголовок', 'сайт для детского лагеря'], ['slug', '/site-dlya-lagerya-yakutsk/'], ['статус', 'черновик / опубликовано']].map(([label, val]) => (
                    <div key={label} style={{ border: '1px solid var(--line)', background: 'rgba(244,241,232,.025)', padding: 12, color: 'var(--muted)', fontSize: 12 }}>
                      <b style={{ display: 'block', color: 'var(--text)', marginBottom: 5, fontFamily: 'var(--mono)', textTransform: 'lowercase' }}>{label}</b>
                      {val}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ border: '1px solid rgba(215,245,111,.24)', background: 'rgba(215,245,111,.045)', padding: 22, color: 'rgba(244,241,232,.66)' }}>
              <h3 style={{ fontFamily: 'var(--head)', fontSize: 20, fontWeight: 800, letterSpacing: '-.045em', marginBottom: 12 }}>{t('admin.noteTitle')}</h3>
              <p style={{ fontSize: 14 }}>{t('admin.noteText')}</p>
            </div>
          </div>
        </Reveal>
        <style>{`@media(max-width:900px){.admin-grid{grid-template-columns:1fr!important;}}`}</style>
      </div>
    </section>
  );
}

export function FaqSection() {
  const { t, d } = useLang();
  return (
    <section id="faq" style={S}>
      <div style={Shell}>
        <Reveal>
          <SectionHead left={<><Eyebrow>{t('faq.eyebrow')}</Eyebrow><h2 style={{ fontFamily: 'var(--head)', fontSize: 'clamp(31px,4.3vw,58px)', fontWeight: 900, letterSpacing: '-.045em', lineHeight: 1, marginTop: 18 }}>{t('faq.title')}</h2></>} />
        </Reveal>
        <div style={{ borderTop: '1px solid var(--line)' }}>
          {d.faq.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
        </div>
      </div>
    </section>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid var(--line)' }}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20,
          padding: '26px 0', background: 'transparent', color: 'var(--text)', textAlign: 'left',
          fontFamily: 'var(--head)', fontSize: 16, fontWeight: 800, cursor: 'pointer',
        }}
      >
        {q}
        <span style={{
          width: 32, height: 32, border: `1px solid ${open ? 'var(--accent)' : 'var(--line2)'}`, display: 'grid', placeItems: 'center', flexShrink: 0,
          transform: open ? 'rotate(45deg)' : 'none', background: open ? 'var(--accent)' : 'transparent',
          color: open ? '#111' : 'var(--muted)',
          transition: '.22s',
        }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 240 : 0, overflow: 'hidden', transition: 'max-height .32s cubic-bezier(.2,.8,.2,1)', color: 'rgba(244,241,232,.66)', maxWidth: 850, paddingBottom: open ? 24 : 0, fontSize: 15 }}>
        {a}
      </div>
    </div>
  );
}

// Need useState import
import { useState } from 'react';
