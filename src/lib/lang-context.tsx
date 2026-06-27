'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { type Lang, type LangData, siteData, loadLangData } from '@/lib/data';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  d: LangData;
}

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ru');
  const [data, setData] = useState<Record<Lang, LangData>>(siteData);

  // load from Supabase when lang changes
  useEffect(() => {
    loadLangData(lang).then(d => {
      setData(prev => ({ ...prev, [lang]: d }));
    });
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = l;
    }
  }, []);

  const t = useCallback((key: string) => {
    return data[lang].i18n[key] ?? key;
  }, [lang, data]);

  const d = data[lang];

  return <Ctx.Provider value={{ lang, setLang, t, d }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLang must be inside LangProvider');
  return ctx;
}
