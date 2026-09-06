'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useLang } from '@/lib/lang-context';
import { useProjectQuote } from '@/lib/project-quote-context';
import { buildBriefPrefill } from '@/lib/project-quote';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { BudgetChoice, ProjectFormatChoice } from '@/components/ui/ProjectChoiceFields';
import { saveLead } from '@/lib/supabase';

const WA = 'https://wa.me/79951155316';

function fieldVal(form: HTMLFormElement, name: string) {
  return ((form.elements.namedItem(name) as HTMLInputElement)?.value ?? '').trim();
}
function checkedVal(form: HTMLFormElement, name: string) {
  return (form.querySelector(`[name="${name}"]:checked`) as HTMLInputElement)?.value ?? '';
}

function openWhatsapp(text: string) {
  window.open(WA + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
}

function quickMsg(form: HTMLFormElement, lang: string) {
  if (lang === 'en') {
    return ['Hello! I want to discuss a website.', '', 'Name: ' + fieldVal(form, 'quickName'), 'Contact: ' + fieldVal(form, 'quickContact'), 'What is needed: ' + fieldVal(form, 'quickNeed')].join('\n');
  }
  return ['Здравствуйте! Хочу обсудить сайт.', '', 'Имя: ' + fieldVal(form, 'quickName'), 'Контакт: ' + fieldVal(form, 'quickContact'), 'Что нужно: ' + fieldVal(form, 'quickNeed')].join('\n');
}

function briefMsg(form: HTMLFormElement, lang: string) {
  if (lang === 'en') {
    return ['Hello! I need a website. Brief below.', '', 'Name: ' + fieldVal(form, 'name'), 'Contact: ' + fieldVal(form, 'contact'), 'Project/niche: ' + fieldVal(form, 'project'), 'Format: ' + fieldVal(form, 'format'), 'Budget: ' + checkedVal(form, 'budget'), 'Task:', fieldVal(form, 'message'), '', 'References/files: I will send in the next message.'].join('\n');
  }
  return ['Здравствуйте! Нужен сайт. Ниже короткий бриф.', '', 'Имя: ' + fieldVal(form, 'name'), 'Контакт: ' + fieldVal(form, 'contact'), 'Ниша/проект: ' + fieldVal(form, 'project'), 'Формат: ' + fieldVal(form, 'format'), 'Бюджет: ' + checkedVal(form, 'budget'), 'Что нужно:', fieldVal(form, 'message'), '', 'Референсы/файлы: отправлю следующим сообщением.'].join('\n');
}

const fieldStyle: React.CSSProperties = {
  width: '100%', minHeight: 54, background: 'rgba(13,14,11,.72)', border: '1px solid var(--line)',
  color: 'var(--text)', padding: '16px 17px', outline: 0, fontFamily: 'var(--body)', fontSize: 15,
};

export function ContactSection() {
  const { t, lang } = useLang();
  const { answers, completed, budgetBand, setAnswer, setBudgetBand } = useProjectQuote();
  const [quickDone, setQuickDone] = useState(false);
  const [briefDone, setBriefDone] = useState(false);
  const [briefMessage, setBriefMessage] = useState('');

  useEffect(() => {
    if (!completed) return;
    setBriefMessage(current => current.trim() ? current : buildBriefPrefill(answers, lang));
  }, [answers, completed, lang]);

  const handleQuick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    openWhatsapp(quickMsg(form, lang));
    try {
      await saveLead({ source: 'quick', lang, name: fieldVal(form, 'quickName'), contact: fieldVal(form, 'quickContact'), need: fieldVal(form, 'quickNeed'), page_url: location.href });
    } catch (_) { /* WhatsApp already opened — non-blocking */ }
    setQuickDone(true);
    form.reset();
  };

  const handleBrief = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    openWhatsapp(briefMsg(form, lang));
    try {
      await saveLead({ source: 'brief', lang, name: fieldVal(form, 'name'), contact: fieldVal(form, 'contact'), project: fieldVal(form, 'project'), format: fieldVal(form, 'format'), budget: checkedVal(form, 'budget'), message: fieldVal(form, 'message'), page_url: location.href });
    } catch (_) { /* WhatsApp already opened — non-blocking */ }
    setBriefDone(true);
    setBriefMessage('');
    form.reset();
  };

  return (
    <section id="contact" style={{ padding: '96px var(--pad)', borderTop: '1px solid var(--line)', background: '#10110e' }}>
      <div style={{ maxWidth: 1480, margin: '0 auto', display: 'grid', gridTemplateColumns: '.82fr 1.18fr', gap: 60 }} className="contact-grid">
        {/* Left: quick form + office */}
        <Reveal>
          <div>
            <Eyebrow>{t('contact.eyebrow')}</Eyebrow>
            <h2 style={{ fontFamily: 'var(--head)', fontSize: 'clamp(31px,4.3vw,58px)', fontWeight: 900, letterSpacing: '-.045em', lineHeight: 1, marginTop: 18 }}>{t('contact.title')}</h2>
            <p style={{ marginTop: 20, maxWidth: 520, color: 'rgba(244,241,232,.66)' }}>{t('contact.text')}</p>

            <div style={{ marginTop: 22, border: '1px solid rgba(215,245,111,.22)', background: 'rgba(215,245,111,.035)', padding: '18px 20px' }}>
              <span style={{ display: 'inline-block', marginBottom: 8, color: 'var(--accent)', fontFamily: 'var(--head)', fontSize: 10, fontWeight: 900, letterSpacing: '.14em', textTransform: 'uppercase' }}>{t('contact.officeLabel')}</span>
              <p style={{ color: 'var(--text)', fontSize: 15, fontWeight: 600 }}>{t('contact.officeAddress')}</p>
              <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
                <a href="https://yandex.ru/maps/?text=%D0%AF%D0%BA%D1%83%D1%82%D1%81%D0%BA%2C%20%D1%83%D0%BB.%20%D0%9B%D0%B5%D1%80%D0%BC%D0%BE%D0%BD%D1%82%D0%BE%D0%B2%D0%B0%2C%2049" target="_blank" rel="noopener" style={{ color: 'var(--accent)', fontSize: 13, textDecoration: 'underline', textUnderlineOffset: 3 }}>{t('contact.officeYandex')}</a>
                <a href="https://2gis.ru/search/%D0%AF%D0%BA%D1%83%D1%82%D1%81%D0%BA%20%D0%9B%D0%B5%D1%80%D0%BC%D0%BE%D0%BD%D1%82%D0%BE%D0%B2%D0%B0%2049" target="_blank" rel="noopener" style={{ color: 'var(--accent)', fontSize: 13, textDecoration: 'underline', textUnderlineOffset: 3 }}>{t('contact.office2gis')}</a>
              </div>
            </div>

            <div style={{ marginTop: 24, border: '1px solid var(--line)', background: 'rgba(244,241,232,.025)', padding: 24 }}>
              <h3 style={{ fontFamily: 'var(--head)', fontSize: 18, fontWeight: 800, letterSpacing: '-.045em', marginBottom: 14 }}>{t('contact.quickTitle')}</h3>
              <form onSubmit={handleQuick} style={{ display: 'grid', gap: 12 }}>
                <input style={fieldStyle} name="quickName" placeholder={t('contact.quickNamePH')} required />
                <input style={fieldStyle} name="quickContact" placeholder={t('contact.quickContactPH')} required />
                <textarea style={{ ...fieldStyle, height: 96, resize: 'vertical' }} name="quickNeed" placeholder={t('contact.quickNeedPH')} />
                <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: 44, padding: '12px 18px', background: 'var(--accent)', border: '1px solid var(--accent)', color: '#111', fontFamily: 'var(--head)', fontSize: 11, fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  {t('contact.quickBtn')}
                </button>
                {quickDone && <div style={{ border: '1px solid rgba(215,245,111,.32)', background: 'rgba(215,245,111,.055)', color: 'var(--accent)', padding: 15, fontWeight: 800, fontSize: 13 }}>{t('contact.quickMsg')}</div>}
              </form>
            </div>
          </div>
        </Reveal>

        {/* Right: full brief */}
        <Reveal delay={0.08}>
          <form onSubmit={handleBrief} style={{ display: 'grid', gap: 14 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' }}>
              <span style={{ width: 32, height: 1, background: 'var(--accent)', opacity: .8 }} />{t('contact.brief')}
            </div>
            {completed && (
              <div style={{ border: '1px solid rgba(125,249,210,.22)', background: 'rgba(125,249,210,.035)', padding: '11px 13px', color: 'rgba(125,249,210,.72)', fontFamily: 'var(--mono)', fontSize: 10 }}>
                0xQUIZ_STATE · {lang === 'ru' ? 'ответы из калькулятора уже подставлены' : 'quiz answers are already prefilled'}
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row">
              <input style={fieldStyle} name="name" placeholder={t('contact.namePH')} required />
              <input style={fieldStyle} name="contact" placeholder={t('contact.contactPH')} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row">
              <input style={fieldStyle} name="project" placeholder={t('contact.projectPH')} required />
              <ProjectFormatChoice
                style={{ ...fieldStyle, minHeight: 54 }}
                value={answers.format}
                onChange={value => setAnswer('format', value)}
              />
            </div>

            <BudgetChoice value={budgetBand} onChange={setBudgetBand} />

            <textarea
              style={{ ...fieldStyle, height: 128, resize: 'vertical' }}
              name="message"
              placeholder={t('contact.messagePH')}
              value={briefMessage}
              onChange={event => setBriefMessage(event.target.value)}
            />
            <p style={{ color: 'var(--muted)', fontSize: 13 }}>{t('contact.files')}</p>
            <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--muted)', fontSize: 13 }}>
              <input type="checkbox" required style={{ marginTop: 4, accentColor: 'var(--accent)' }} />
              <span>{t('contact.agreeText')} <a href="#privacy" style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3 }}>{t('contact.agreeLink')}</a>.</span>
            </label>
            <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: 44, padding: '12px 18px', background: 'var(--accent)', border: '1px solid var(--accent)', color: '#111', fontFamily: 'var(--head)', fontSize: 11, fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
              {t('contact.briefBtn')}
            </button>
            {briefDone && <div style={{ border: '1px solid rgba(215,245,111,.32)', background: 'rgba(215,245,111,.055)', color: 'var(--accent)', padding: 15, fontWeight: 800, fontSize: 13 }}>{t('contact.briefMsg')}</div>}
          </form>
        </Reveal>
      </div>
      <style>{`@media(max-width:900px){.contact-grid{grid-template-columns:1fr!important;gap:40px!important;}.form-row{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

export function PrivacySection() {
  const { t } = useLang();
  return (
    <section id="privacy" style={{ padding: '40px var(--pad)', borderTop: '1px solid var(--line)', background: '#0b0c0a' }}>
      <div style={{ maxWidth: 1480, margin: '0 auto' }}>
        <div style={{ marginBottom: 18 }}>
          <Eyebrow>{t('privacy.eyebrow')}</Eyebrow>
          <h2 style={{ fontFamily: 'var(--head)', fontSize: 20, fontWeight: 900, letterSpacing: '-.045em', marginTop: 12 }}>{t('privacy.title')}</h2>
        </div>
        <p style={{ maxWidth: 900, color: 'rgba(244,241,232,.5)', fontSize: 13, marginBottom: 12 }}>{t('privacy.text')}</p>
        <p style={{ maxWidth: 900, color: 'rgba(244,241,232,.5)', fontSize: 13 }}>{t('privacy.note')}</p>
      </div>
    </section>
  );
}
