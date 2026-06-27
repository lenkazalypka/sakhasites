'use client';

import { useLang } from '@/lib/lang-context';

const ASCII_LOGO = `
 ░░░░░  ░░░  ░░░  ░░░  ░░░░░  ░░░░░  ░░░░░  ░░░░░  ░░░░░
░       ░░░  ░░░  ░░░  ░░░    ░░░    ░░░     ░░░    ░░░
░░░░░   ░░░  ░░░  ░░░  ░░░░░  ░░░░░  ░░░     ░░░    ░░░░░
░       ░░░  ░░░  ░░░  ░░░        ░  ░░░     ░░░    ░░░
 ░░░░░   ░░░░░░░  ░░░  ░░░░░  ░░░░░  ░░░░░   ░░░    ░░░░░
`.trim();

export function Footer() {
  const { t } = useLang();

  const navLinks = [
    { href: '#services', label: 'услуги' },
    { href: '#cases', label: 'кейсы' },
    { href: '#pricing', label: 'цены' },
    { href: '#process', label: 'процесс' },
    { href: '#privacy', label: 'политика данных' },
  ];

  const formats = ['мини-сайт', 'лендинг', 'сайт для бизнеса', 'админка по задаче'];

  return (
    <footer style={{ padding: '72px var(--pad) 34px', background: '#060706', borderTop: '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
      {/* background grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(125,249,210,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(125,249,210,.025) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none', maskImage: 'linear-gradient(transparent, rgba(0,0,0,.6) 30%)' }} />

      <div style={{ maxWidth: 1480, margin: '0 auto', position: 'relative' }}>
        {/* ASCII logo strip */}
        <pre style={{ fontFamily: 'var(--mono)', fontSize: 7, lineHeight: 1.4, color: 'rgba(215,245,111,.08)', userSelect: 'none', overflowX: 'auto', marginBottom: 44, whiteSpace: 'pre' }}>
          {ASCII_LOGO}
        </pre>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 40, marginBottom: 58, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 360 }}>
            <div style={{ fontFamily: 'var(--head)', fontSize: 44, fontWeight: 900, letterSpacing: '-.06em' }}>
              sakha<i style={{ fontStyle: 'normal', color: 'var(--accent)' }}>sites</i>
            </div>
            <p style={{ marginTop: 10, color: 'rgba(244,241,232,.58)', fontSize: 14 }}>{t('footer.text')}</p>

            {/* status badge */}
            <div style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(125,249,210,.2)', padding: '8px 14px', background: 'rgba(125,249,210,.04)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(125,249,210,.7)', letterSpacing: '.1em' }}>
                SYSTEM · ONLINE · 99.9% UPTIME
              </span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 48 }} className="footer-links">
            <div>
              <h4 style={{ marginBottom: 16, color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.14em' }}>{t('footer.site')}</h4>
              <ul style={{ display: 'grid', gap: 10, listStyle: 'none' }}>
                {navLinks.map(l => (
                  <li key={l.href}>
                    <a href={l.href} style={{ color: 'rgba(244,241,232,.5)', fontSize: 13, display: 'flex', gap: 7, alignItems: 'center', transition: 'color .18s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,241,232,.5)')}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', opacity: .5 }}>›</span>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: 16, color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.14em' }}>{t('footer.formats')}</h4>
              <ul style={{ display: 'grid', gap: 10, listStyle: 'none' }}>
                {formats.map(f => (
                  <li key={f} style={{ color: 'rgba(244,241,232,.5)', fontSize: 13, display: 'flex', gap: 7 }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--cyan)', opacity: .5 }}>+</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: 16, color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.14em' }}>{t('footer.contacts')}</h4>
              <ul style={{ display: 'grid', gap: 10, listStyle: 'none' }}>
                {[
                  { href: 'https://wa.me/79951155316', label: 'WhatsApp' },
                  { href: 'https://t.me/lenaitt', label: 'Telegram @lenaitt' },
                ].map(l => (
                  <li key={l.href}>
                    <a href={l.href} style={{ color: 'rgba(244,241,232,.5)', fontSize: 13, transition: 'color .18s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,241,232,.5)')}>
                      {l.label}
                    </a>
                  </li>
                ))}
                <li style={{ color: 'rgba(244,241,232,.4)', fontSize: 12, fontFamily: 'var(--mono)', lineHeight: 1.7 }}>
                  {t('footer.address')}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, paddingTop: 20, borderTop: '1px solid var(--line)', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)' }}>© 2026 sakhasites</span>
          <div style={{ display: 'flex', gap: 18, fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(244,241,232,.2)', letterSpacing: '.08em' }}>
            <span>Next.js</span>
            <span>·</span>
            <span>Supabase</span>
            <span>·</span>
            <span>Vercel Edge</span>
            <span>·</span>
            <span>TypeScript</span>
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)' }}>Якутск · РФ · online</span>
        </div>
      </div>
      <style>{`@media(max-width:900px){.footer-links{grid-template-columns:1fr!important;gap:28px!important;}}`}</style>
    </footer>
  );
}
