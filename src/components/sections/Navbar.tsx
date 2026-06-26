'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/lib/lang-context';
import type { Lang } from '@/lib/data';

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 120;
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(sec => {
        const el = sec as HTMLElement;
        if (el.offsetTop <= pos && el.offsetTop + el.offsetHeight > pos) {
          setActiveSection(el.id);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#services', label: t('nav.services') },
    { href: '#cases', label: t('nav.cases') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#process', label: t('nav.process') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
      display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 28,
      alignItems: 'center', padding: '16px var(--pad)',
      background: 'rgba(13,14,11,.78)', borderBottom: '1px solid var(--line)',
      backdropFilter: 'blur(18px)',
    }} aria-label="Основная навигация">
      <a href="#home" aria-label="sakhasites" style={{ fontFamily: 'var(--head)', fontSize: 22, fontWeight: 900, letterSpacing: '-.06em' }}>
        sakha<i style={{ fontStyle: 'normal', color: 'var(--accent)' }}>sites</i>
      </a>

      <ul style={{ display: 'flex', justifyContent: 'center', gap: 22, listStyle: 'none' }} className="nav-links-desktop">
        {links.map(l => (
          <li key={l.href}>
            <a
              href={l.href}
              style={{
                fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase',
                color: activeSection === l.href.slice(1) ? 'var(--text)' : 'rgba(244,241,232,.56)',
                transition: '.2s',
              }}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <a
          href="https://wa.me/79951155316"
          data-goal="whatsapp"
          style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '12px 18px', background: 'rgba(244,241,232,.035)', border: '1px solid var(--line2)', color: 'var(--text)', fontFamily: 'var(--head)', fontSize: 11, fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase', transition: '.2s' }}
          className="nav-btn-ghost"
        >
          whatsapp
        </a>
        <a
          href="https://t.me/lenaitt"
          data-goal="telegram"
          style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '12px 18px', background: 'var(--accent)', border: '1px solid var(--accent)', color: '#111', fontFamily: 'var(--head)', fontSize: 11, fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase', transition: '.2s' }}
        >
          telegram
        </a>
        <div style={{ display: 'flex', height: 44, border: '1px solid var(--line2)', background: 'rgba(244,241,232,.035)' }} aria-label="переключение языка">
          {(['ru', 'en'] as Lang[]).map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              style={{
                minWidth: 39, padding: '0 9px', background: lang === l ? 'var(--text)' : 'transparent',
                color: lang === l ? '#111' : 'rgba(244,241,232,.62)',
                borderRight: l === 'ru' ? '1px solid var(--line)' : '0',
                fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 700, border: 'none', cursor: 'pointer',
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:1180px){ .nav-links-desktop { display: none !important; } .nav-btn-ghost { display: none !important; } }
        @media(max-width:900px){ nav { grid-template-columns: 1fr auto !important; padding: 14px 18px !important; } }
      `}</style>
    </nav>
  );
}
