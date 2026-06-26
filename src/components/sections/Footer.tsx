'use client';

import { useLang } from '@/lib/lang-context';

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
    <footer style={{ padding: '72px var(--pad) 34px', background: '#080907', borderTop: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1480, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 40, marginBottom: 58, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: 'var(--head)', fontSize: 40, fontWeight: 900, letterSpacing: '-.06em' }}>
              sakha<i style={{ fontStyle: 'normal', color: 'var(--accent)' }}>sites</i>
            </div>
            <p style={{ marginTop: 10, maxWidth: 470, color: 'rgba(244,241,232,.66)' }}>{t('footer.text')}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 48 }} className="footer-links">
            <div>
              <h4 style={{ marginBottom: 16, color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.12em' }}>{t('footer.site')}</h4>
              <ul style={{ display: 'grid', gap: 10, listStyle: 'none' }}>
                {navLinks.map(l => <li key={l.href}><a href={l.href} style={{ color: 'rgba(244,241,232,.58)', fontSize: 14 }}>{l.label}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: 16, color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.12em' }}>{t('footer.formats')}</h4>
              <ul style={{ display: 'grid', gap: 10, listStyle: 'none' }}>
                {formats.map(f => <li key={f} style={{ color: 'rgba(244,241,232,.58)', fontSize: 14 }}>{f}</li>)}
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: 16, color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.12em' }}>{t('footer.contacts')}</h4>
              <ul style={{ display: 'grid', gap: 10, listStyle: 'none' }}>
                <li><a href="https://wa.me/79951155316" style={{ color: 'rgba(244,241,232,.58)', fontSize: 14 }}>whatsapp +79951155316</a></li>
                <li><a href="https://t.me/lenaitt" style={{ color: 'rgba(244,241,232,.58)', fontSize: 14 }}>telegram @lenaitt</a></li>
                <li style={{ color: 'rgba(244,241,232,.58)', fontSize: 14 }}>{t('footer.address')}</li>
                <li style={{ color: 'rgba(244,241,232,.58)', fontSize: 14 }}>якутск · москва · онлайн</li>
              </ul>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, paddingTop: 24, borderTop: '1px solid var(--line)', color: 'var(--muted)', fontSize: 12 }}>
          <span>© 2026 sakhasites</span>
          <span>Якутск · онлайн по РФ</span>
        </div>
      </div>
      <style>{`@media(max-width:900px){.footer-links{grid-template-columns:1fr!important;gap:28px!important;}}`}</style>
    </footer>
  );
}
