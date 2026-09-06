'use client';

import type { CSSProperties } from 'react';
import { useLang } from '@/lib/lang-context';
import {
  BUDGET_LABELS,
  FORMAT_LABELS,
  type BudgetBand,
  type SiteFormat,
} from '@/lib/project-quote';

const FORMAT_KEYS: SiteFormat[] = ['mini', 'landing', 'business', 'unknown'];
const BUDGET_KEYS: BudgetBand[] = ['under20', '20-35', '35-70', '70plus', 'discuss', 'unknown'];

interface ProjectFormatChoiceProps {
  value: SiteFormat | '';
  onChange: (value: SiteFormat) => void;
  mode?: 'select' | 'cards';
  name?: string;
  style?: CSSProperties;
}

export function ProjectFormatChoice({ value, onChange, mode = 'select', name = 'format', style }: ProjectFormatChoiceProps) {
  const { lang, t } = useLang();

  if (mode === 'cards') {
    return (
      <div role="radiogroup" aria-label={lang === 'ru' ? 'Формат сайта' : 'Website format'} style={{ display: 'grid', gap: 10 }}>
        {FORMAT_KEYS.map((key, index) => {
          const selected = value === key;
          return (
            <button
              key={key}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(key)}
              style={{
                minHeight: 58,
                padding: '14px 16px',
                border: `1px solid ${selected ? 'var(--accent)' : 'var(--line)'}`,
                background: selected ? 'rgba(215,245,111,.08)' : 'rgba(7,8,6,.38)',
                color: selected ? 'var(--text)' : 'rgba(244,241,232,.72)',
                display: 'grid',
                gridTemplateColumns: '42px 1fr 20px',
                gap: 12,
                alignItems: 'center',
                textAlign: 'left',
                transition: 'border-color .18s, background .18s',
              }}
            >
              <span style={{ fontFamily: 'var(--mono)', color: selected ? 'var(--accent)' : 'var(--cyan)', fontSize: 10 }}>
                0x{String(index + 1).padStart(2, '0')}
              </span>
              <span style={{ fontFamily: 'var(--body)', fontSize: 14, fontWeight: 700 }}>
                {FORMAT_LABELS[key][lang]}
              </span>
              <span aria-hidden style={{ fontFamily: 'var(--mono)', color: selected ? 'var(--accent)' : 'rgba(244,241,232,.25)' }}>
                {selected ? '●' : '○'}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  const selectedLabel = value ? FORMAT_LABELS[value][lang] : '';

  return (
    <select
      style={style}
      name={name}
      value={selectedLabel}
      onChange={event => {
        const next = FORMAT_KEYS.find(key => FORMAT_LABELS[key][lang] === event.target.value);
        if (next) onChange(next);
      }}
    >
      <option value="">{t('contact.formatLabel')}</option>
      {FORMAT_KEYS.map(key => (
        <option key={key} value={FORMAT_LABELS[key][lang]}>{FORMAT_LABELS[key][lang]}</option>
      ))}
    </select>
  );
}

interface BudgetChoiceProps {
  value: BudgetBand | '';
  onChange: (value: BudgetBand) => void;
  name?: string;
}

export function BudgetChoice({ value, onChange, name = 'budget' }: BudgetChoiceProps) {
  const { lang } = useLang();

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}
      className="budget-grid"
      role="radiogroup"
      aria-label={lang === 'ru' ? 'Бюджет' : 'Budget'}
    >
      {BUDGET_KEYS.map(key => {
        const selected = value === key;
        const label = BUDGET_LABELS[key][lang];
        return (
          <label key={key} style={{ position: 'relative' }}>
            <input
              type="radio"
              name={name}
              value={label}
              checked={selected}
              onChange={() => onChange(key)}
              style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
            />
            <span
              className="budget-chip"
              style={{
                display: 'block',
                border: `1px solid ${selected ? 'var(--accent)' : 'var(--line)'}`,
                background: selected ? 'var(--accent)' : 'rgba(13,14,11,.6)',
                padding: 13,
                textAlign: 'center',
                color: selected ? '#111' : 'var(--muted)',
                fontSize: 12,
                cursor: 'pointer',
                transition: '.2s',
              }}
            >
              {label}
            </span>
          </label>
        );
      })}
      <style>{`@media(max-width:900px){.budget-grid{grid-template-columns:1fr 1fr!important;}}`}</style>
    </div>
  );
}
