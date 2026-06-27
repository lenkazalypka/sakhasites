'use client';

import { useLang } from '@/lib/lang-context';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { GlitchText } from '@/components/ui/GlitchText';
import { HexCoord, CornerMarks } from '@/components/ui/HexCoord';
import { MatrixRain } from '@/components/ui/MatrixRain';
import { ScanCard } from '@/components/ui/ScanCard';

const S: React.CSSProperties = { padding: '96px var(--pad)', borderTop: '1px solid var(--line)', position: 'relative' };
const Shell: React.CSSProperties = { maxWidth: 1480, margin: '0 auto' };

// ─── section eyebrow with hex coord ──────────────────────
const SectionHead = ({ left, right, coord }: { left: React.ReactNode; right?: string; coord?: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: right ? 'minmax(0,1fr) minmax(280px,540px)' : '1fr', gap: 40, alignItems: 'start', marginBottom: 42, position: 'relative' }} className="section-head">
    <div>{left}</div>
    {right && <p style={{ color: 'rgba(244,241,232,.66)', fontSize: 16 }}>{right}</p>}
    {coord && (
      <div style={{ position: 'absolute', right: 0, top: 0, fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(125,249,210,.2)', textAlign: 'right', lineHeight: 1.8, userSelect: 'none' }}>
        {coord}
      </div>
    )}
    <style>{`@media(max-width:900px){.section-head{grid-template-columns:1fr!important;}}`}</style>
  </div>
);

// ─── SERVICES ─────────────────────────────────────────────
export function ServicesSection() {
  const { t, d } = useLang();
  const TECH: [string, string, string][] = [
    ['Next.js', 'TypeScript', 'Vercel'],
    ['React', 'Tailwind', 'SEO'],
    ['Supabase', 'PostgreSQL', 'Webhook'],
  ];
  const ASCII = [
    '┌─────────────────┐\n│  ░░░░░░░░░░░░░  │\n│  ░ ЛЕНДИНГ ░░░  │\n│  ░░░░░ → ░░░░  │\n│  ░░░ ЗАЯВКА ░░  │\n└─────────────────┘',
    '┌──┬──────────────┐\n│  │  /services   │\n├──┼──────────────┤\n│  │  /cases     │\n├──┼──────────────┤\n│  │  /contact   │\n└──┴──────────────┘',
    '┌─────────────────┐\n│ leads.status()  │\n│ > новая → 🔔    │\n│ > в работе      │\n│ content.edit()  │\n└─────────────────┘',
  ];

  return (
    <section id="services" style={S}>
      <div style={Shell}>
        <Reveal>
          <SectionHead
            coord={'0x001A · SVC\nlat: 62.03 · lng: 129.73'}
            left={
              <>
                <Eyebrow>{t('services.eyebrow')}</Eyebrow>
                <GlitchText tag="h2" style={{ display: 'block', fontFamily: 'var(--head)', fontSize: 'clamp(31px,4.3vw,58px)', fontWeight: 900, letterSpacing: '-.045em', lineHeight: 1, marginTop: 18 }}>
                  {t('services.title')}
                </GlitchText>
              </>
            }
            right={t('services.text')}
          />
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1.08fr .96fr .96fr', gap: 14 }} className="services-grid">
          {d.services.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.05}>
              <ScanCard
                accent={i === 0}
                style={{ padding: 30, minHeight: 280, gridColumn: i === 0 ? 'span 2' : undefined, display: 'flex', flexDirection: 'column' }}
                cornerColor={i === 0 ? 'rgba(215,245,111,.5)' : 'rgba(125,249,210,.25)'}
              >
                {/* ASCII art top */}
                <pre style={{
                  fontFamily: 'var(--mono)', fontSize: 8.5, lineHeight: 1.5,
                  color: i === 0 ? 'rgba(215,245,111,.22)' : 'rgba(125,249,210,.18)',
                  marginBottom: 16, userSelect: 'none', overflow: 'hidden',
                  whiteSpace: 'pre',
                }}>{ASCII[i]}</pre>

                <div style={{ marginBottom: 10, color: i === 0 ? 'rgba(215,245,111,.8)' : 'rgba(125,249,210,.7)', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.14em' }}>
                  {s.num} ·· {i === 0 ? '0x01 LANDING' : i === 1 ? '0x02 WEBSITE' : '0x03 CMS'}
                </div>

                <h3 style={{ fontFamily: 'var(--head)', fontSize: i === 0 ? 22 : 18, fontWeight: 800, letterSpacing: '-.045em', marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: 'rgba(244,241,232,.6)', fontSize: 14, marginBottom: 14 }}>{s.desc}</p>

                <ul style={{ display: 'grid', gap: 8, listStyle: 'none', flex: 1 }}>
                  {s.list.map((item, j) => (
                    <li key={item} style={{ display: 'flex', gap: 10, color: 'rgba(244,241,232,.65)', fontSize: 13 }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: i === 0 ? 'var(--accent)' : 'var(--cyan)', flexShrink: 0, paddingTop: 1 }}>
                        {String(j + 1).padStart(2, '0')}.
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 18, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
                  {TECH[i].map(tag => (
                    <code key={tag} style={{
                      fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '.08em',
                      padding: '3px 7px',
                      border: `1px solid ${i === 0 ? 'rgba(215,245,111,.25)' : 'rgba(125,249,210,.2)'}`,
                      color: i === 0 ? 'rgba(215,245,111,.65)' : 'rgba(125,249,210,.55)',
                      background: 'rgba(0,0,0,.2)',
                    }}>{tag}</code>
                  ))}
                </div>
              </ScanCard>
            </Reveal>
          ))}
          <style>{`@media(max-width:900px){.services-grid{grid-template-columns:1fr!important;}}`}</style>
        </div>
      </div>
    </section>
  );
}

// ─── CASES ────────────────────────────────────────────────
export function CasesSection() {
  const { t, d } = useLang();
  return (
    <section id="cases" style={S}>
      <div style={Shell}>
        <Reveal>
          <SectionHead
            coord={'0x002B · CASES\n∑ projects: 4'}
            left={
              <>
                <Eyebrow>{t('cases.eyebrow')}</Eyebrow>
                <GlitchText tag="h2" style={{ display: 'block', fontFamily: 'var(--head)', fontSize: 'clamp(31px,4.3vw,58px)', fontWeight: 900, letterSpacing: '-.045em', lineHeight: 1, marginTop: 18 }}>
                  {t('cases.title')}
                </GlitchText>
              </>
            }
            right={t('cases.text')}
          />
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 14 }} className="cases-grid">
          {d.cases.map((c, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <article style={{
                minHeight: c.large ? 420 : 520, border: '1px solid var(--line)',
                display: 'grid', gridColumn: c.large ? 'span 2' : undefined,
                gridTemplateColumns: c.large ? '1.05fr .95fr' : undefined,
                gridTemplateRows: c.large ? 'auto' : '260px 1fr',
                overflow: 'hidden', position: 'relative',
                background: 'rgba(13,14,11,.9)',
                transition: 'border-color .3s',
              }}
                className={`case ${c.large ? 'case-large' : ''}`}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(125,249,210,.35)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--line)')}
              >
                {/* visual pane with matrix rain */}
                <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg,#0a0b08,#141610)' }}>
                  <MatrixRain opacity={0.13} />

                  {/* corner marks */}
                  <CornerMarks color="rgba(125,249,210,.25)" />

                  {/* hex coords */}
                  <HexCoord
                    x={`0x${(i * 0x1a3 + 0xfe2).toString(16).toUpperCase()}`}
                    y={`0x${(i * 0x27 + 0xb4).toString(16).toUpperCase()}`}
                    style={{ position: 'absolute', top: 14, left: 14, zIndex: 2 }}
                  />

                  {/* mock UI floating in rain */}
                  <div style={{
                    position: 'absolute', zIndex: 2,
                    border: '1px solid rgba(125,249,210,.2)',
                    background: 'rgba(8,9,7,.88)',
                    boxShadow: '0 0 40px rgba(125,249,210,.07)',
                    ...(c.large
                      ? { left: 40, right: 80, top: 50, height: 190 }
                      : { left: 40, right: 40, bottom: 40, height: 160 }),
                  }}>
                    {/* titlebar */}
                    <div style={{ height: 26, borderBottom: '1px solid rgba(125,249,210,.12)', background: 'rgba(125,249,210,.03)', display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px' }}>
                      {['rgba(215,245,111,.5)', 'rgba(125,249,210,.35)', 'rgba(244,241,232,.18)'].map((c, j) => (
                        <span key={j} style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />
                      ))}
                      <span style={{ marginLeft: 8, fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(125,249,210,.4)' }}>
                        {c.kind}.tsx
                      </span>
                    </div>
                    {/* fake code lines */}
                    <div style={{ padding: 12, display: 'grid', gap: 7 }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(215,245,111,.5)' }}>const</span>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(125,249,210,.7)' }}>{c.title.replace(' ', '_')}</span>
                        <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(244,241,232,.3)' }}>= {'{'}</span>
                      </div>
                      <span style={{ display: 'block', height: 7, background: 'rgba(244,241,232,.06)', width: '80%', marginLeft: 14 }} />
                      <span style={{ display: 'block', height: 7, background: 'rgba(215,245,111,.1)', width: '55%', marginLeft: 14 }} />
                      <span style={{ display: 'block', height: 7, background: 'rgba(244,241,232,.04)', width: '67%', marginLeft: 14 }} />
                      <span style={{ display: 'block', height: 22, background: 'rgba(215,245,111,.18)', width: '42%', marginLeft: 0, marginTop: 4 }} />
                    </div>
                  </div>
                </div>

                {/* content pane */}
                <div style={{ padding: 28, display: 'flex', flexDirection: 'column' }}>
                  <code style={{ display: 'inline-block', marginBottom: 14, color: '#111', background: 'var(--accent)', padding: '5px 9px', fontSize: 9, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '.12em' }}>
                    {c.kind}
                  </code>
                  <GlitchText tag="h3" style={{ fontFamily: 'var(--head)', fontSize: 'clamp(22px,2.6vw,38px)', fontWeight: 800, letterSpacing: '-.045em', marginBottom: 16 }}>
                    {c.title}
                  </GlitchText>

                  <dl style={{ display: 'grid', gap: 12, flex: 1 }}>
                    {([['task', c.task], ['done', c.done], ['result', c.result]] as const).map(([key, val]) => (
                      <div key={key} style={{ borderLeft: `2px solid ${key === 'result' ? 'var(--accent)' : 'var(--line)'}`, paddingLeft: 12 }}>
                        <dt style={{ color: key === 'result' ? 'var(--accent)' : 'var(--cyan)', fontFamily: 'var(--mono)', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: 3 }}>
                          {key === 'result' ? '→ ' : '// '}{t(`case.${key}`)}
                        </dt>
                        <dd style={{ color: 'rgba(244,241,232,.65)', fontSize: 13 }}>{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <style>{`@media(max-width:900px){.cases-grid{grid-template-columns:1fr!important;}.case{grid-column:auto!important;grid-template-columns:1fr!important;grid-template-rows:200px 1fr!important;min-height:auto!important;}}`}</style>
      </div>
    </section>
  );
}

// ─── PRICING ──────────────────────────────────────────────
export function PricingSection() {
  const { t, d } = useLang();
  return (
    <section id="pricing" style={S}>
      <div style={Shell}>
        <Reveal>
          <SectionHead
            coord={'0x003C · PRICE\nRUB · 2025'}
            left={
              <>
                <Eyebrow>{t('pricing.eyebrow')}</Eyebrow>
                <GlitchText tag="h2" style={{ display: 'block', fontFamily: 'var(--head)', fontSize: 'clamp(31px,4.3vw,58px)', fontWeight: 900, letterSpacing: '-.045em', lineHeight: 1, marginTop: 18 }}>
                  {t('pricing.title')}
                </GlitchText>
              </>
            }
            right={t('pricing.text')}
          />
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 14 }} className="pricing-grid">
          {d.pricing.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.05}>
              <ScanCard
                style={{ padding: 30, minHeight: 220, gridColumn: i === 2 ? '1 / -1' : undefined, position: 'relative' }}
                accent={i === 2}
              >
                <div style={{ position: 'absolute', top: 14, right: 18, fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(244,241,232,.15)', letterSpacing: '.1em' }}>
                  PKG_{p.num}
                </div>
                <div style={{ color: 'rgba(215,245,111,.7)', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.14em', marginBottom: 14 }}>
                  {p.num} ────────────────
                </div>
                <h3 style={{ fontFamily: 'var(--head)', fontSize: 18, fontWeight: 800, letterSpacing: '-.045em' }}>{p.title}</h3>
                <div style={{ margin: '14px 0 6px', fontFamily: 'var(--head)', fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 900, letterSpacing: '-.06em', color: 'var(--text)' }}>
                  {p.price}
                </div>
                <p style={{ color: 'rgba(244,241,232,.6)', fontSize: 14, marginBottom: 6 }}>{p.desc}</p>
                <p style={{ color: 'var(--muted)', fontSize: 12, fontFamily: 'var(--mono)' }}>// {p.note}</p>
              </ScanCard>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{ marginTop: 14, border: '1px solid var(--line)', background: 'rgba(0,0,0,.18)', padding: '20px 24px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', flexShrink: 0, marginTop: 1 }}>ADDONS</span>
            <div style={{ width: 1, alignSelf: 'stretch', background: 'var(--line)', margin: '0 10px' }} />
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, listStyle: 'none', flex: 1 }} className="addons-list">
              {d.addons.map(a => (
                <li key={a} style={{ color: 'rgba(244,241,232,.6)', fontSize: 13, display: 'flex', gap: 6 }}>
                  <span style={{ color: 'var(--cyan)', fontFamily: 'var(--mono)', fontSize: 10, flexShrink: 0 }}>+</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <style>{`@media(max-width:900px){.pricing-grid{grid-template-columns:1fr!important;}.addons-list{grid-template-columns:1fr!important;}}`}</style>
      </div>
    </section>
  );
}

// ─── PROCESS ──────────────────────────────────────────────
export function ProcessSection() {
  const { t, d } = useLang();
  const CMDS = [
    { cmd: '$ brief --input client.md', out: '→ scope.json  ✔' },
    { cmd: '$ figma export --tokens', out: '→ design.css  ✔' },
    { cmd: '$ npm run build', out: '→ .next/  3.2s ✔' },
    { cmd: '$ vercel --prod', out: '→ live 🚀  ✔' },
  ];

  return (
    <section id="process" style={S}>
      <div style={Shell}>
        <Reveal>
          <SectionHead
            coord={'0x004D · PROC\nsteps: 4'}
            left={
              <>
                <Eyebrow>{t('process.eyebrow')}</Eyebrow>
                <GlitchText tag="h2" style={{ display: 'block', fontFamily: 'var(--head)', fontSize: 'clamp(31px,4.3vw,58px)', fontWeight: 900, letterSpacing: '-.045em', lineHeight: 1, marginTop: 18 }}>
                  {t('process.title')}
                </GlitchText>
              </>
            }
            right={t('process.text')}
          />
        </Reveal>

        {/* horizontal pipeline with connector line */}
        <div style={{ position: 'relative' }}>
          {/* connector line */}
          <div style={{ position: 'absolute', top: 52, left: '12.5%', right: '12.5%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(215,245,111,.3) 10%, rgba(215,245,111,.3) 90%, transparent)', pointerEvents: 'none', zIndex: 0 }} className="proc-line" />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: '1px solid var(--line)' }} className="process-grid">
            {d.process.map((p, i) => (
              <Reveal key={p.num} delay={i * 0.07}>
                <ScanCard style={{ padding: 28, borderRight: i < 3 ? '1px solid var(--line)' : undefined, minHeight: 240 }} cornerColor="rgba(215,245,111,.2)">
                  {/* step number circle */}
                  <div style={{ width: 36, height: 36, border: '1px solid rgba(215,245,111,.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22, background: 'rgba(215,245,111,.06)' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, color: 'var(--accent)' }}>{p.num}</span>
                  </div>

                  <h3 style={{ fontFamily: 'var(--head)', fontSize: 18, fontWeight: 800, letterSpacing: '-.045em', marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ color: 'rgba(244,241,232,.6)', fontSize: 13, marginBottom: 16 }}>{p.text}</p>

                  {/* terminal snippet */}
                  <div style={{ background: 'rgba(0,0,0,.38)', border: '1px solid rgba(215,245,111,.12)', padding: '9px 12px' }}>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(215,245,111,.65)', marginBottom: 3 }}>
                      {CMDS[i].cmd}
                    </div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(125,249,210,.5)' }}>
                      {CMDS[i].out}
                    </div>
                  </div>
                </ScanCard>
              </Reveal>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){.process-grid{grid-template-columns:1fr!important;border:0!important;gap:10px!important;}.proc-line{display:none;}}`}</style>
      </div>
    </section>
  );
}

// ─── ADMIN PREVIEW ────────────────────────────────────────
export function AdminSection() {
  const { t } = useLang();
  return (
    <section style={S}>
      <div style={Shell}>
        <Reveal>
          <SectionHead
            coord={'0x005E · CMS\nsupabase · edge'}
            left={
              <>
                <Eyebrow>{t('admin.eyebrow')}</Eyebrow>
                <GlitchText tag="h2" style={{ display: 'block', fontFamily: 'var(--head)', fontSize: 'clamp(31px,4.3vw,58px)', fontWeight: 900, letterSpacing: '-.045em', lineHeight: 1, marginTop: 18 }}>
                  {t('admin.title')}
                </GlitchText>
              </>
            }
          />
        </Reveal>

        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }} className="admin-grid">
            {/* mock admin UI */}
            <ScanCard style={{ overflow: 'hidden' }}>
              {/* topbar */}
              <div style={{ height: 40, borderBottom: '1px solid var(--line)', background: 'rgba(0,0,0,.3)', display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px' }}>
                <div style={{ display: 'flex', gap: 5 }}>
                  {['rgba(215,245,111,.6)', 'rgba(125,249,210,.4)', 'rgba(244,241,232,.2)'].map((c, i) => (
                    <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <span style={{ marginLeft: 10, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)' }}>
                  sakhasites admin · cms
                </span>
                <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(125,249,210,.5)' }}>● connected</span>
              </div>
              {/* tabs */}
              <div style={{ height: 36, borderBottom: '1px solid var(--line)', display: 'flex', background: 'rgba(0,0,0,.15)' }}>
                {['заявки', 'услуги', 'кейсы', 'цены', 'faq'].map((tab, i) => (
                  <div key={tab} style={{ padding: '0 16px', display: 'flex', alignItems: 'center', fontFamily: 'var(--mono)', fontSize: 10, color: i === 0 ? 'var(--accent)' : 'var(--muted)', borderBottom: i === 0 ? '2px solid var(--accent)' : '2px solid transparent', letterSpacing: '.06em' }}>
                    {tab}
                  </div>
                ))}
              </div>
              {/* table */}
              <div style={{ padding: 16 }}>
                {[
                  { name: 'Арсен М.', contact: '@arsen_m', status: 'новая', src: 'quick', time: '10 мин назад', accent: true },
                  { name: 'ООО Сириус', contact: '+7 999 ···', status: 'в работе', src: 'brief', time: '2 ч назад', accent: false },
                  { name: 'Лена В.', contact: '@lena_v', status: 'закрыта', src: 'quick', time: '1 д назад', accent: false },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 100px 90px 70px 1fr', gap: 12, alignItems: 'center', padding: '10px 4px', borderBottom: i < 2 ? '1px solid var(--line)' : undefined }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: row.accent ? 'var(--accent)' : 'var(--text)' }}>{row.name}</span>
                    <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{row.contact}</span>
                    <span style={{ display: 'inline-block', padding: '3px 7px', fontSize: 10, fontFamily: 'var(--mono)', background: row.status === 'новая' ? 'rgba(215,245,111,.15)' : row.status === 'в работе' ? 'rgba(125,249,210,.1)' : 'rgba(244,241,232,.06)', color: row.status === 'новая' ? 'var(--accent)' : row.status === 'в работе' ? 'var(--cyan)' : 'var(--muted)' }}>
                      {row.status}
                    </span>
                    <span style={{ fontSize: 10, fontFamily: 'var(--mono)', color: 'rgba(215,245,111,.5)', padding: '2px 5px', border: '1px solid rgba(215,245,111,.15)' }}>{row.src}</span>
                    <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--mono)', textAlign: 'right' }}>{row.time}</span>
                  </div>
                ))}
              </div>
            </ScanCard>

            {/* note panel */}
            <div style={{ display: 'grid', gap: 12 }}>
              <ScanCard accent style={{ padding: 22 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '.1em', marginBottom: 10 }}>// NOTE</div>
                <b style={{ display: 'block', fontFamily: 'var(--head)', fontSize: 15, fontWeight: 800, letterSpacing: '-.03em', marginBottom: 8 }}>{t('admin.noteTitle')}</b>
                <p style={{ color: 'rgba(244,241,232,.65)', fontSize: 13 }}>{t('admin.noteText')}</p>
              </ScanCard>
              <ScanCard style={{ padding: 18 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--cyan)', letterSpacing: '.1em', marginBottom: 10 }}>STACK</div>
                {[['DB', 'Supabase PostgreSQL'], ['AUTH', 'RLS Policies'], ['EDGE', 'Vercel Edge'], ['NOTIF', 'Telegram Bot']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', gap: 10, marginBottom: 7, alignItems: 'center' }}>
                    <code style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', padding: '2px 5px', border: '1px solid rgba(215,245,111,.2)', flexShrink: 0 }}>{k}</code>
                    <span style={{ fontSize: 12, color: 'rgba(244,241,232,.6)' }}>{v}</span>
                  </div>
                ))}
              </ScanCard>
            </div>
          </div>
        </Reveal>
        <style>{`@media(max-width:900px){.admin-grid{grid-template-columns:1fr!important;}}`}</style>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────
export function FaqSection() {
  const { t, d } = useLang();
  return (
    <section id="faq" style={S}>
      <div style={Shell}>
        <Reveal>
          <SectionHead
            coord={'0x006F · FAQ\nentries: ' + d.faq.length}
            left={
              <>
                <Eyebrow>{t('faq.eyebrow')}</Eyebrow>
                <GlitchText tag="h2" style={{ display: 'block', fontFamily: 'var(--head)', fontSize: 'clamp(31px,4.3vw,58px)', fontWeight: 900, letterSpacing: '-.045em', lineHeight: 1, marginTop: 18 }}>
                  {t('faq.title')}
                </GlitchText>
              </>
            }
          />
        </Reveal>

        <div style={{ display: 'grid', gap: 0, border: '1px solid var(--line)' }}>
          {d.faq.map((f, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <details
                style={{ borderBottom: i < d.faq.length - 1 ? '1px solid var(--line)' : undefined, padding: '20px 24px', cursor: 'pointer' }}
              >
                <summary style={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 14, alignItems: 'center', listStyle: 'none', userSelect: 'none' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', opacity: .7 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontFamily: 'var(--head)', fontSize: 15, fontWeight: 700, letterSpacing: '-.02em' }}>
                    {f.q}
                  </span>
                </summary>
                <p style={{ gridColumn: 2, marginTop: 12, paddingLeft: 42, color: 'rgba(244,241,232,.65)', fontSize: 14, lineHeight: 1.6 }}>{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
