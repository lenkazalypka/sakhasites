export type SiteFormat = 'mini' | 'landing' | 'business' | 'unknown';
export type SiteScope = 'one' | 'medium' | 'large';
export type AdminNeed = 'no' | 'yes' | 'unsure';
export type Urgency = 'normal' | 'fast' | 'deadline';
export type BudgetBand = 'under20' | '20-35' | '35-70' | '70plus' | 'discuss' | 'unknown';
export type QuoteLang = 'ru' | 'en';

export interface ProjectQuizAnswers {
  format: SiteFormat | '';
  scope: SiteScope | '';
  admin: AdminNeed | '';
  urgency: Urgency | '';
  deadline: string;
}

export interface ProjectQuote {
  format: Exclude<SiteFormat, 'unknown'>;
  total: number;
  rangeMin: number;
  rangeMax: number;
  budgetBand: BudgetBand;
  rushApplied: boolean;
}

export const EMPTY_PROJECT_ANSWERS: ProjectQuizAnswers = {
  format: '',
  scope: '',
  admin: '',
  urgency: '',
  deadline: '',
};

export const FORMAT_LABELS: Record<SiteFormat, Record<QuoteLang, string>> = {
  mini: { ru: 'мини-сайт / визитка', en: 'mini-site / business card' },
  landing: { ru: 'лендинг', en: 'landing page' },
  business: { ru: 'сайт для бизнеса', en: 'business website' },
  unknown: { ru: 'нужна консультация', en: 'consultation needed' },
};

export const BUDGET_LABELS: Record<BudgetBand, Record<QuoteLang, string>> = {
  under20: { ru: 'до 20к', en: 'up to 20k' },
  '20-35': { ru: '20–35к', en: '20–35k' },
  '35-70': { ru: '35–70к', en: '35–70k' },
  '70plus': { ru: '70к+', en: '70k+' },
  discuss: { ru: 'обсудить', en: 'discuss' },
  unknown: { ru: 'не знаю', en: 'not sure' },
};

const PRICE_TABLE: Record<Exclude<SiteFormat, 'unknown'>, {
  base: number;
  medium: number;
  large: number;
  admin: number;
  rush: number;
}> = {
  mini: { base: 12_000, medium: 0, large: 5_000, admin: 15_000, rush: 0.20 },
  landing: { base: 20_000, medium: 5_000, large: 10_000, admin: 15_000, rush: 0.20 },
  business: { base: 35_000, medium: 0, large: 10_000, admin: 15_000, rush: 0.15 },
};

function deadlineIsRush(deadline: string, now = new Date()) {
  if (!deadline) return false;
  const due = new Date(`${deadline}T23:59:59`);
  if (Number.isNaN(due.getTime())) return false;
  const days = (due.getTime() - now.getTime()) / 86_400_000;
  return days >= 0 && days <= 14;
}

function rangeTop(total: number) {
  const withBuffer = total * 1.15;
  const rounded = Math.round(withBuffer / 5_000) * 5_000;
  return Math.max(total, rounded);
}

export function budgetBandFor(total: number): BudgetBand {
  if (total <= 20_000) return 'under20';
  if (total < 35_000) return '20-35';
  if (total < 70_000) return '35-70';
  return '70plus';
}

export function calculateProjectQuote(answers: ProjectQuizAnswers, now = new Date()): ProjectQuote | null {
  if (!answers.format || answers.format === 'unknown') return null;

  const row = PRICE_TABLE[answers.format];
  let total = row.base;

  if (answers.scope === 'medium') total += row.medium;
  if (answers.scope === 'large') total += row.large;
  if (answers.admin === 'yes') total += row.admin;

  const rushApplied = answers.urgency === 'fast'
    || (answers.urgency === 'deadline' && deadlineIsRush(answers.deadline, now));

  if (rushApplied) total = Math.round(total * (1 + row.rush));

  return {
    format: answers.format,
    total,
    rangeMin: total,
    rangeMax: rangeTop(total),
    budgetBand: budgetBandFor(total),
    rushApplied,
  };
}

export function formatRub(value: number) {
  return `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
}

export function quoteRangeText(quote: ProjectQuote, lang: QuoteLang) {
  const joiner = lang === 'ru' ? ' – ' : ' – ';
  return `${new Intl.NumberFormat(lang === 'ru' ? 'ru-RU' : 'en-US').format(quote.rangeMin)}${joiner}${new Intl.NumberFormat(lang === 'ru' ? 'ru-RU' : 'en-US').format(quote.rangeMax)} ₽`;
}

export function formatLabel(format: SiteFormat | '', lang: QuoteLang) {
  if (!format) return '';
  return FORMAT_LABELS[format][lang];
}

export function budgetLabel(band: BudgetBand | '', lang: QuoteLang) {
  if (!band) return '';
  return BUDGET_LABELS[band][lang];
}

export function urgencyLabel(answers: ProjectQuizAnswers, lang: QuoteLang) {
  if (answers.urgency === 'fast') return lang === 'ru' ? '1–2 недели' : '1–2 weeks';
  if (answers.urgency === 'normal') return lang === 'ru' ? '3–4 недели' : '3–4 weeks';
  if (answers.urgency === 'deadline') {
    if (!answers.deadline) return lang === 'ru' ? 'есть дедлайн' : 'fixed deadline';
    const [year, month, day] = answers.deadline.split('-');
    const formatted = lang === 'ru' ? `${day}.${month}.${year}` : `${year}-${month}-${day}`;
    return lang === 'ru' ? `дедлайн ${formatted}` : `deadline ${formatted}`;
  }
  return lang === 'ru' ? 'уточним' : 'to be discussed';
}

export function buildBriefPrefill(answers: ProjectQuizAnswers, lang: QuoteLang) {
  const scope = {
    one: { ru: '1 экран', en: '1 screen' },
    medium: { ru: '2–4 раздела', en: '2–4 sections' },
    large: { ru: '5+ разделов и подстраницы', en: '5+ sections and subpages' },
  } as const;
  const admin = {
    no: { ru: 'нет, достаточно WhatsApp/Telegram', en: 'no, WhatsApp/Telegram is enough' },
    yes: { ru: 'да, нужна админка / CRM', en: 'yes, admin / CRM is needed' },
    unsure: { ru: 'не уверен', en: 'not sure' },
  } as const;

  if (answers.format === 'unknown') {
    return lang === 'ru'
      ? 'Прошёл квиз: нужна консультация по формату сайта.'
      : 'Completed the quiz: I need help choosing the website format.';
  }

  const parts = [
    answers.scope ? (lang === 'ru' ? `объём: ${scope[answers.scope].ru}` : `scope: ${scope[answers.scope].en}`) : '',
    answers.admin ? (lang === 'ru' ? `админка/CRM: ${admin[answers.admin].ru}` : `admin/CRM: ${admin[answers.admin].en}`) : '',
    answers.urgency ? (lang === 'ru' ? `срок: ${urgencyLabel(answers, lang)}` : `timing: ${urgencyLabel(answers, lang)}`) : '',
  ].filter(Boolean);

  return lang === 'ru' ? `Квиз: ${parts.join('; ')}.` : `Quiz: ${parts.join('; ')}.`;
}
