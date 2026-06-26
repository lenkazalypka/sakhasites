'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { type Lang, siteData } from '@/lib/data';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  d: typeof siteData['ru'];
}

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ru');

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = l;
    }
  }, []);

  const t = useCallback((key: string) => {
    return siteData[lang].i18n[key] ?? key;
  }, [lang]);

  const d = siteData[lang];

  return <Ctx.Provider value={{ lang, setLang, t, d }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLang must be inside LangProvider');
  return ctx;
}
