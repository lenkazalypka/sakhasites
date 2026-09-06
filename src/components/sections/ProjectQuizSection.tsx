'use client';

import { useMemo, useState } from 'react';
import { useLang } from '@/lib/lang-context';
import { useProjectQuote } from '@/lib/project-quote-context';
import {
  formatLabel,
  quoteRangeText,
  urgencyLabel,
  type AdminNeed,
  type SiteScope,
  type Urgency,
} from '@/lib/project-quote';
import { ProjectFormatChoice } from '@/components/ui/ProjectChoiceFields';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { ScanCard } from '@/components/ui/ScanCard';
import { CornerMarks } from '@/components/ui/HexCoord';

const WA = 'https://wa.me/79951155316';
const SHELL: React.CSSProperties = { maxWidth: 1480, margin: '0 auto' };

function localToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function ChoiceList<T extends string>({
  value,
  items,
  onChange,
}: {
  value: T | '';
  items: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div role="radiogroup" style={{ display: 'grid', gap: 10 }}>
      {items.map((item, index) => {
        const selected = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(item.value)}
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
            }}
          >
            <span style={{ fontFamily: 'var(--mono)', color: selected ? 'var(--accent)' : 'var(--cyan)', fontSize: 10 }}>
              0x{String(index + 1).padStart(2, '0')}
            </span>
            <span style={{ fontSize: 14, fontWeight: 700 }}>{item.label}</span>
            <span aria-hidden style={{ fontFamily: 'var(--mono)', color: selected ? 'var(--accent)' : 'rgba(244,241,232,.25)' }}>
              {selected ? '●' : '○'}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function ProjectQuizSection() {
  const { lang } = useLang();
  const { answers, quote, setAnswer, completeQuiz, completed, resetQuiz } = useProjectQuote();
  const [step, setStep] = useState(0);
  const resultMode = step === 4;

  const copy = lang === 'ru' ? {
    eyebrow: 'калькулятор · 30 секунд',
    title: 'подбери формат сайта за 30 секунд',
    text: '4 коротких вопроса. В конце покажем формат и ориентир по бюджету без звонка и регистрации.',
    questions: [
      'Что нужно?',
      'Сколько экранов/разделов примерно?',
      'Нужна админка или приём заявок в базу/CRM?',
      'Когда нужен результат?',
    ],
    scope: [
      { value: 'one' as const, label: '1 экран' },
      { value: 'medium' as const, label: '2–4 раздела' },
      { value: 'large' as const, label: '5+ разделов и подстраницы' },
    ],
    admin: [
      { value: 'no' as const, label: 'Нет, достаточно кнопки в WhatsApp/Telegram' },
      { value: 'yes' as const, label: 'Да, хочу видеть заявки и статусы в системе' },
      { value: 'unsure' as const, label: 'Не уверен' },
    ],
    urgency: [
      { value: 'normal' as const, label: 'Не горит, 3–4 недели ок' },
      { value: 'fast' as const, label: 'Нужно быстро, 1–2 недели' },
      { value: 'deadline' as const, label: 'Есть дедлайн, назовите дату' },
    ],
    back: 'назад',
    next: 'дальше',
    finish: 'показать результат',
    result: 'расчёт готов',
    format: 'формат',
    budget: 'ориентир',
    included: 'что войдёт',
    whatsapp: 'обсудить в WhatsApp',
    brief: 'перейти к брифу',
    edit: 'изменить ответы',
    consultation: 'нужна консультация',
    noPrice: 'без расчёта цены',
    consultationText: 'Не будем гадать по бюджету. В бриф уже передадим пометку, что нужно помочь выбрать формат.',
    disclaimer: 'Финальная смета зависит от брифа. Вилка оставляет запас на объём и детали проекта.',
    deadlineLabel: 'дата дедлайна',
  } : {
    eyebrow: 'calculator · 30 seconds',
    title: 'pick the right website format in 30 seconds',
    text: '4 quick questions. You will get a format and a budget range without a call or registration.',
    questions: [
      'What do you need?',
      'Roughly how many screens/sections?',
      'Do you need an admin panel or CRM lead storage?',
      'When do you need the result?',
    ],
    scope: [
      { value: 'one' as const, label: '1 screen' },
      { value: 'medium' as const, label: '2–4 sections' },
      { value: 'large' as const, label: '5+ sections and subpages' },
    ],
    admin: [
      { value: 'no' as const, label: 'No, a WhatsApp/Telegram button is enough' },
      { value: 'yes' as const, label: 'Yes, I want leads and statuses in the system' },
      { value: 'unsure' as const, label: 'Not sure' },
    ],
    urgency: [
      { value: 'normal' as const, label: 'No rush, 3–4 weeks is fine' },
      { value: 'fast' as const, label: 'Fast, 1–2 weeks' },
      { value: 'deadline' as const, label: 'I have a deadline, choose a date' },
    ],
    back: 'back',
    next: 'next',
    finish: 'show result',
    result: 'estimate ready',
    format: 'format',
    budget: 'estimate',
    included: 'included',
    whatsapp: 'discuss in WhatsApp',
    brief: 'open brief',
    edit: 'edit answers',
    consultation: 'consultation needed',
    noPrice: 'no price estimate',
    consultationText: 'We will not guess the budget. The brief will already say that you need help choosing the format.',
    disclaimer: 'The final quote depends on the brief. The range leaves room for scope and project details.',
    deadlineLabel: 'deadline date',
  };

  const inclusions = useMemo(() => {
    if (answers.format === 'mini') return lang === 'ru'
      ? ['1 экран и мобильная версия', 'кнопка в WhatsApp / Telegram', answers.admin === 'yes' ? 'админка / CRM и статусы заявок' : 'подготовка к запуску']
      : ['1 screen and mobile layout', 'WhatsApp / Telegram button', answers.admin === 'yes' ? 'admin / CRM and lead statuses' : 'launch preparation'];
    if (answers.format === 'landing') return lang === 'ru'
      ? ['структура под услугу или запуск', 'адаптив + форма / мессенджер', answers.admin === 'yes' ? 'админка / CRM и статусы заявок' : 'базовая SEO-разметка']
      : ['structure for a service or launch', 'responsive layout + form / messenger', answers.admin === 'yes' ? 'admin / CRM and lead statuses' : 'basic SEO markup'];
    if (answers.format === 'business') return lang === 'ru'
      ? ['страницы услуг, кейсов и контактов', 'адаптив + базовая SEO-структура', answers.admin === 'yes' ? 'админка / CRM и статусы заявок' : 'подготовка к росту сайта']
      : ['service, case and contact pages', 'responsive layout + basic SEO structure', answers.admin === 'yes' ? 'admin / CRM and lead statuses' : 'room for future growth'];
    return [];
  }, [answers.format, answers.admin, lang]);

  const canContinue = step === 0 ? Boolean(answers.format)
    : step === 1 ? Boolean(answers.scope)
      : step === 2 ? Boolean(answers.admin)
        : step === 3 ? Boolean(answers.urgency) && (answers.urgency !== 'deadline' || Boolean(answers.deadline))
          : true;

  const selectFormat = (value: Parameters<typeof setAnswer<'format'>>[1]) => {
    setAnswer('format', value);
    if (value === 'unknown') {
      completeQuiz();
      setStep(4);
    }
  };

  const next = () => {
    if (!canContinue) return;
    if (step === 3) {
      completeQuiz();
      setStep(4);
      return;
    }
    setStep(current => current + 1);
  };

  const restart = () => {
    resetQuiz();
    setStep(0);
  };

  const range = quote ? quoteRangeText(quote, lang) : copy.noPrice;
  const format = answers.format ? formatLabel(answers.format, lang) : copy.consultation;
  const timing = urgencyLabel(answers, lang);
  const waText = lang === 'ru'
    ? `Здравствуйте! Прошёл квиз на сайте: формат — ${format}, бюджет — ${range}, срочность — ${timing}. Хочу обсудить проект.`
    : `Hello! I completed the website quiz: format — ${format}, budget — ${range}, timing — ${timing}. I want to discuss the project.`;
  const waHref = `${WA}?text=${encodeURIComponent(waText)}`;
  const progress = resultMode ? 100 : ((step + 1) / 4) * 100;

  return (
    <section id="quiz" style={{ padding: '96px var(--pad)', borderTop: '1px solid var(--line)', position: 'relative', background: 'rgba(7,8,6,.28)' }}>
      <div style={SHELL}>
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,.78fr) minmax(420px,1.22fr)', gap: 54, alignItems: 'start' }} className="quiz-layout">
            <div>
              <Eyebrow>{copy.eyebrow}</Eyebrow>
              <div style={{ marginTop: 14, fontFamily: 'var(--mono)', fontSize: 10, color: 'rgba(125,249,210,.42)', letterSpacing: '.12em' }}>
                0x003A · QUIZ / PRE_PRICE<br />STATUS: {resultMode ? 'COMPLETE' : `Q${step + 1}_OF_4`}
              </div>
              <h2 style={{ fontFamily: 'var(--head)', fontSize: 'clamp(31px,4vw,54px)', lineHeight: 1.04, letterSpacing: '-.045em', fontWeight: 900, marginTop: 18 }}>
                {copy.title}
              </h2>
              <p style={{ marginTop: 18, maxWidth: 580, color: 'rgba(244,241,232,.64)', fontSize: 15 }}>
                {copy.text}
              </p>
            </div>

            <ScanCard style={{ position: 'relative', overflow: 'hidden', minHeight: 470, background: 'rgba(10,11,8,.92)' }} accent>
              <CornerMarks color="rgba(215,245,111,.35)" />
              <div style={{ borderBottom: '1px solid var(--line)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', letterSpacing: '.12em' }}>
                  0x00{String(58 + Math.min(step, 4)).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted)', marginLeft: 'auto' }}>
                  {resultMode ? '4/4' : `${step + 1}/4`}
                </span>
              </div>
              <div style={{ height: 3, background: 'rgba(244,241,232,.07)' }} aria-hidden>
                <div style={{ height: '100%', width: `${progress}%`, background: 'var(--accent)', transition: 'width .25s var(--ease)' }} />
              </div>

              {!resultMode ? (
                <div style={{ padding: 'clamp(22px,4vw,38px)' }}>
                  <div style={{ fontFamily: 'var(--mono)', color: 'var(--cyan)', fontSize: 10, letterSpacing: '.14em', marginBottom: 10 }}>
                    QUERY_{String(step + 1).padStart(2, '0')}
                  </div>
                  <h3 style={{ fontFamily: 'var(--head)', fontSize: 'clamp(20px,2.4vw,28px)', lineHeight: 1.2, letterSpacing: '-.035em', marginBottom: 24 }}>
                    {copy.questions[step]}
                  </h3>

                  {step === 0 && (
                    <ProjectFormatChoice value={answers.format} onChange={selectFormat} mode="cards" />
                  )}
                  {step === 1 && (
                    <ChoiceList<SiteScope> value={answers.scope} items={copy.scope} onChange={value => setAnswer('scope', value)} />
                  )}
                  {step === 2 && (
                    <ChoiceList<AdminNeed> value={answers.admin} items={copy.admin} onChange={value => setAnswer('admin', value)} />
                  )}
                  {step === 3 && (
                    <>
                      <ChoiceList<Urgency> value={answers.urgency} items={copy.urgency} onChange={value => {
                        setAnswer('urgency', value);
                        if (value !== 'deadline') setAnswer('deadline', '');
                      }} />
                      {answers.urgency === 'deadline' && (
                        <label style={{ display: 'grid', gap: 8, marginTop: 12 }}>
                          <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '.08em' }}>{copy.deadlineLabel}</span>
                          <input
                            type="date"
                            min={localToday()}
                            value={answers.deadline}
                            onChange={event => setAnswer('deadline', event.target.value)}
                            style={{ minHeight: 52, background: 'rgba(13,14,11,.72)', border: '1px solid var(--line)', color: 'var(--text)', padding: '12px 14px', colorScheme: 'dark' }}
                          />
                        </label>
                      )}
                    </>
                  )}

                  <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'space-between' }}>
                    <button
                      type="button"
                      onClick={() => setStep(current => Math.max(0, current - 1))}
                      disabled={step === 0}
                      style={{ minHeight: 44, padding: '10px 14px', border: '1px solid var(--line)', background: 'transparent', color: step === 0 ? 'rgba(244,241,232,.22)' : 'var(--muted)', fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em' }}
                    >
                      ← {copy.back}
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      disabled={!canContinue}
                      style={{ minHeight: 44, padding: '10px 18px', border: '1px solid var(--accent)', background: canContinue ? 'var(--accent)' : 'rgba(215,245,111,.12)', color: canContinue ? '#111' : 'rgba(244,241,232,.32)', fontFamily: 'var(--head)', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.07em' }}
                    >
                      {step === 3 ? copy.finish : copy.next} →
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ padding: 'clamp(22px,4vw,38px)' }} aria-live="polite">
                  <div style={{ fontFamily: 'var(--mono)', color: 'var(--accent)', fontSize: 10, letterSpacing: '.14em', marginBottom: 10 }}>
                    RESULT_OK · {completed ? 'STATE_SAVED' : 'PREVIEW'}
                  </div>
                  <h3 style={{ fontFamily: 'var(--head)', fontSize: 'clamp(24px,3vw,34px)', letterSpacing: '-.04em', lineHeight: 1.1 }}>
                    {answers.format === 'unknown' ? copy.consultation : copy.result}
                  </h3>

                  {answers.format === 'unknown' ? (
                    <div style={{ marginTop: 22, border: '1px solid rgba(215,245,111,.28)', padding: 20, background: 'rgba(215,245,111,.04)' }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', marginBottom: 8 }}>0xCONSULT</div>
                      <p style={{ color: 'rgba(244,241,232,.68)', fontSize: 14 }}>{copy.consultationText}</p>
                    </div>
                  ) : (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 22 }} className="quiz-result-grid">
                        <div style={{ border: '1px solid var(--line)', padding: 16, background: 'rgba(0,0,0,.2)' }}>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.12em' }}>{copy.format}</div>
                          <div style={{ marginTop: 6, fontFamily: 'var(--head)', fontSize: 16, fontWeight: 800 }}>{format}</div>
                        </div>
                        <div style={{ border: '1px solid rgba(215,245,111,.26)', padding: 16, background: 'rgba(215,245,111,.035)' }}>
                          <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '.12em' }}>{copy.budget}</div>
                          <div style={{ marginTop: 6, fontFamily: 'var(--head)', fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 900, letterSpacing: '-.04em' }}>{range}</div>
                        </div>
                      </div>

                      <div style={{ marginTop: 18 }}>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 9 }}>{copy.included}</div>
                        <ul style={{ display: 'grid', gap: 8, listStyle: 'none' }}>
                          {inclusions.slice(0, 3).map((item, index) => (
                            <li key={item} style={{ display: 'flex', gap: 10, color: 'rgba(244,241,232,.67)', fontSize: 13 }}>
                              <span style={{ fontFamily: 'var(--mono)', color: 'var(--accent)', fontSize: 10 }}>0x0{index + 1}</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p style={{ marginTop: 16, color: 'var(--muted)', fontSize: 11, fontFamily: 'var(--mono)' }}>// {copy.disclaimer}</p>
                    </>
                  )}

                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 24 }}>
                    {answers.format === 'unknown' && (
                      <a href="#contact" style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '11px 17px', background: 'var(--accent)', color: '#111', border: '1px solid var(--accent)', fontFamily: 'var(--head)', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.07em' }}>
                        {copy.brief} →
                      </a>
                    )}
                    <a href={waHref} target="_blank" rel="noopener" style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '11px 17px', background: answers.format === 'unknown' ? 'transparent' : 'var(--accent)', color: answers.format === 'unknown' ? 'var(--accent)' : '#111', border: '1px solid var(--accent)', fontFamily: 'var(--head)', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.07em' }}>
                      {copy.whatsapp} →
                    </a>
                    <button type="button" onClick={restart} style={{ minHeight: 44, padding: '11px 14px', background: 'transparent', color: 'var(--muted)', border: '1px solid var(--line)', fontFamily: 'var(--mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.07em' }}>
                      {copy.edit}
                    </button>
                  </div>
                </div>
              )}
            </ScanCard>
          </div>
        </Reveal>
      </div>
      <style>{`@media(max-width:900px){.quiz-layout{grid-template-columns:1fr!important;gap:34px!important;}.quiz-result-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
