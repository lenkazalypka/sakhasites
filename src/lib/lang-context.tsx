'use client';

import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react';
import { type Lang, type LangData, siteData, loadLangData } from '@/lib/data';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  d: LangData;
}

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'ru';
    return (localStorage.getItem('lang') as Lang) ?? 'ru';
  });
  const [data, setData] = useState<Record<Lang, LangData>>(siteData);
  const loaded = useRef<Set<Lang>>(new Set());

  useEffect(() => {
    // skip if already loaded for this lang
    if (loaded.current.has(lang)) return;
    // only load if supabase env is set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    loadLangData(lang).then(d => {
      loaded.current.add(lang);
      // preserve scroll position across setState
      const scrollY = window.scrollY;
      setData(prev => ({ ...prev, [lang]: d }));
      requestAnimationFrame(() => { window.scrollTo({ top: scrollY, behavior: 'instant' }); });
    });
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== 'undefined') localStorage.setItem('lang', l);
    if (typeof document !== 'undefined') document.documentElement.lang = l;
  }, []);

  const t = useCallback((key: string) => data[lang].i18n[key] ?? key, [lang, data]);
  const d = data[lang];

  return <Ctx.Provider value={{ lang, setLang, t, d }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLang must be inside LangProvider');
  return ctx;
}
