'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/lib/lang-context';
import type { Lang } from '@/lib/data';

export function Navbar() {
  const { lang, setLang, t } = useLang();
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 120;
      setScrolled(window.scrollY > 10);
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

  // close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 1180) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { href: '#services', label: t('nav.services') },
    { href: '#cases',    label: t('nav.cases')    },
    { href: '#pricing',  label: t('nav.pricing')  },
    { href: '#process',  label: t('nav.process')  },
    { href: '#contact',  label: t('nav.contact')  },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
        display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 28,
        alignItems: 'center', padding: '16px var(--pad)',
        background: scrolled ? 'rgba(13,14,11,.92)' : 'rgba(13,14,11,.78)',
        borderBottom: '1px solid var(--line)',
        backdropFilter: 'blur(18px)',
        transition: 'background .25s',
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
            className="nav-btn-tg"
          >
            telegram
          </a>
          <div style={{ display: 'flex', height: 44, border: '1px solid var(--line2)', background: 'rgba(244,241,232,.035)' }} aria-label="переключение языка" className="nav-lang">
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

          {/* hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'закрыть меню' : 'открыть меню'}
            aria-expanded={menuOpen}
            className="nav-burger"
            style={{
              display: 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
              gap: 5, width: 44, height: 44, background: 'rgba(244,241,232,.035)',
              border: '1px solid var(--line2)', cursor: 'pointer', padding: 0, flexShrink: 0,
            }}
          >
            <span style={{ display: 'block', width: 18, height: 1.5, background: menuOpen ? 'var(--accent)' : 'var(--text)', transition: '.2s', transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: 18, height: 1.5, background: menuOpen ? 'var(--accent)' : 'var(--text)', transition: '.2s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 18, height: 1.5, background: menuOpen ? 'var(--accent)' : 'var(--text)', transition: '.2s', transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* mobile overlay menu */}
      <div
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed', inset: 0, zIndex: 850,
          background: 'rgba(13,14,11,.96)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          padding: 'calc(80px + var(--pad)) var(--pad) var(--pad)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity .22s',
        }}
      >
        {/* grid decoration */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(215,245,111,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(215,245,111,.03) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

        <ul style={{ listStyle: 'none', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4, position: 'relative' }}>
          {links.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={closeMenu}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '18px 0',
                  borderBottom: '1px solid var(--line)',
                  fontFamily: 'var(--head)', fontSize: 'clamp(26px, 7vw, 40px)',
                  fontWeight: 900, letterSpacing: '-.04em',
                  color: activeSection === l.href.slice(1) ? 'var(--accent)' : 'var(--text)',
                  transition: 'color .18s',
                }}
              >
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', opacity: .5, flexShrink: 0, paddingTop: 4 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', gap: 10, position: 'relative' }}>
          <a href="https://wa.me/79951155316" onClick={closeMenu} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 52, background: 'rgba(244,241,232,.06)', border: '1px solid var(--line2)', color: 'var(--text)', fontFamily: 'var(--head)', fontSize: 12, fontWeight: 900, letterSpacing: '.06em', textTransform: 'uppercase' }}>
            WhatsApp
          </a>
          <a href="https://t.me/lenaitt" onClick={closeMenu} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 52, background: 'var(--accent)', border: '1px solid var(--accent)', color: '#111', fontFamily: 'var(--head)', fontSize: 12, fontWeight: 900, letterSpacing: '.06em', textTransform: 'uppercase' }}>
            Telegram
          </a>
        </div>
      </div>

      <style>{`
        @media(max-width:1180px){
          .nav-links-desktop { display: none !important; }
          .nav-btn-ghost { display: none !important; }
          .nav-btn-tg { display: none !important; }
          .nav-burger { display: flex !important; }
        }
        @media(max-width:900px){
          nav { grid-template-columns: 1fr auto !important; padding: 14px 18px !important; }
          .nav-lang { display: none !important; }
        }
      `}</style>
    </>
  );
}
