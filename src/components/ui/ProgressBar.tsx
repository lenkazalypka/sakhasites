'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/lib/lang-context';

export function ProgressBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setWidth(max ? (h.scrollTop / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, height: 2, width: `${width}%`,
      background: 'linear-gradient(90deg, var(--accent), var(--cyan))',
      boxShadow: '0 0 12px rgba(125,249,210,.6)', zIndex: 2000,
      transition: 'width .1s linear',
    }} />
  );
}

export function FloatCta() {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY;
      const badSections = ['home', 'contact', 'privacy'];
      let activeId = 'home';
      document.querySelectorAll('section[id]').forEach(sec => {
        const el = sec as HTMLElement;
        if (el.offsetTop <= pos + 120 && el.offsetTop + el.offsetHeight > pos + 120) {
          activeId = el.id;
        }
      });
      setShow(pos > 520 && !badSections.includes(activeId));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a
        href="https://wa.me/79951155316"
        data-goal="whatsapp"
        aria-label={t('floatCta.label')}
        style={{
          position: 'fixed', right: 20, bottom: 20, zIndex: 900,
          display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 20px',
          background: 'var(--accent)', border: '1px solid var(--accent)', color: '#111',
          fontFamily: 'var(--head)', fontSize: 11, fontWeight: 900, letterSpacing: '.06em', textTransform: 'uppercase',
          boxShadow: '0 16px 36px rgba(0,0,0,.4)',
          opacity: show ? 1 : 0, transform: show ? 'translateY(0) scale(1)' : 'translateY(16px) scale(.96)',
          pointerEvents: show ? 'auto' : 'none', transition: '.25s cubic-bezier(.2,.8,.2,1)',
        }}
      >
        {t('floatCta.label')}
      </a>
      <style>{`@media(max-width:640px){[data-float-cta]{left:16px!important;right:16px!important;justify-content:center!important;bottom:16px!important;}}`}</style>
    </>
  );
}
