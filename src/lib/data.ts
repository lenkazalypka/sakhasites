export type Lang = 'ru' | 'en';

export interface I18n {
  [key: string]: string;
}

export interface ServiceItem {
  num: string;
  title: string;
  desc: string;
  list: string[];
}

export interface CaseItem {
  kind: string;
  title: string;
  task: string;
  done: string;
  result: string;
  large?: boolean;
}

export interface PricingItem {
  num: string;
  title: string;
  price: string;
  desc: string;
  note: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  text: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface LangData {
  i18n: I18n;
  services: ServiceItem[];
  cases: CaseItem[];
  pricing: PricingItem[];
  addons: string[];
  process: ProcessStep[];
  faq: FaqItem[];
}

export const siteData: Record<Lang, LangData> = {
  ru: {
    i18n: {
      'hero.eyebrow': 'Якутск · онлайн по РФ',
      'hero.title': 'сайты для бизнеса, которые объясняют услугу и приводят заявки',
      'hero.titleAccent': 'объясняют услугу',
      'hero.lead': 'Камерная веб-студия: лендинги и сайты без шаблонов — структура, дизайн, адаптив и понятный путь до заявки.',
      'hero.primary': 'обсудить проект',
      'hero.secondary': 'посмотреть кейсы',
      'hero.proof1Title': 'без шаблонов',
      'hero.proof1Text': 'визуал под нишу и задачу',
      'hero.proof2Title': 'под телефон',
      'hero.proof2Text': 'нормальная мобильная версия',
      'hero.proof3Title': 'заявки',
      'hero.proof3Text': 'WhatsApp / Telegram',
      'hero.visual1': 'смысл',
      'hero.visual2': 'заявка',
      'floatCta.label': 'обсудить в whatsapp',
      'services.eyebrow': 'услуги',
      'services.title': 'не "просто дизайн", а упаковка до заявки',
      'services.text': 'На главной оставлены только форматы, которые легче всего продать и объяснить клиенту: лендинг, сайт для бизнеса, админка и заявки.',
      'cases.eyebrow': 'кейсы',
      'cases.title': 'примеры задач и что получилось в результате',
      'cases.text': 'Ниже — реальные постановки задач из нашей практики: что нужно было клиенту и какой результат сайт даёт сейчас.',
      'pricing.eyebrow': 'цены',
      'pricing.title': 'пакеты выглядят как старт проекта, а не прайс на блоки',
      'pricing.text': 'Стоимость зависит от структуры, текстов, количества экранов, админки и интеграций. Ниже — понятные ориентиры для первого разговора.',
      'process.eyebrow': 'процесс',
      'process.title': 'спокойная работа по шагам',
      'process.text': 'Сначала фиксируем задачу и структуру, потом визуал, адаптив, заявки и запуск. Так меньше хаоса в правках и быстрее появляется рабочая ссылка.',
      'admin.eyebrow': 'админка / заявки',
      'admin.title': 'пример, как может выглядеть редактирование контента',
      'admin.text': 'Админка не подаётся как обязательная часть базового сайта. Она нужна, если часто меняются цены, статьи, кейсы, фото или заявки должны храниться в системе.',
      'admin.noteTitle': 'это не просто макет',
      'admin.noteText': 'Экран выше — иллюстрация интерфейса. А заявки именно с этой страницы реально сохраняются в базу данных и видны в рабочей админке.',
      'faq.eyebrow': 'faq',
      'faq.title': 'коротко и по делу',
      'contact.eyebrow': 'контакты',
      'contact.title': 'расскажите, какой сайт нужен',
      'contact.text': 'Заполните короткий бриф. WhatsApp откроется с готовым текстом, и заявка уйдёт с вашего номера.',
      'contact.quickTitle': 'быстрая заявка',
      'contact.quickBtn': 'отправить в whatsapp',
      'contact.quickMsg': 'открылся whatsapp с текстом заявки. проверьте сообщение и нажмите отправить.',
      'contact.brief': 'короткий бриф',
      'contact.files': 'Референсы и файлы можно отправить следующим сообщением в WhatsApp или Telegram.',
      'contact.briefBtn': 'отправить бриф в whatsapp',
      'contact.briefMsg': 'открылся whatsapp с вашей анкетой. проверьте текст и нажмите отправить.',
      'contact.officeLabel': 'офис',
      'contact.officeAddress': 'г. Якутск, ул. Лермонтова, 49, офис 202',
      'contact.officeYandex': 'Яндекс.Карты',
      'contact.office2gis': '2ГИС',
      'contact.agreeText': 'согласен с обработкой данных и',
      'contact.agreeLink': 'политикой обработки персональных данных',
      'contact.formatLabel': 'формат',
      'contact.formatOptions': 'мини-сайт / визитка,лендинг,сайт для бизнеса,админка / заявки,не знаю, помогите выбрать',
      'contact.namePH': 'имя',
      'contact.contactPH': 'контакт: whatsapp / telegram',
      'contact.projectPH': 'ниша / проект',
      'contact.messagePH': 'что нужно сделать',
      'contact.quickNamePH': 'имя',
      'contact.quickContactPH': 'telegram или whatsapp',
      'contact.quickNeedPH': 'что нужно',
      'privacy.eyebrow': 'данные',
      'privacy.title': 'политика обработки данных',
      'privacy.text': 'sakhasites получает только данные, которые человек сам отправляет через форму или мессенджер: имя, контакт и детали проекта. Они сохраняются для обработки заявки и не передаются третьим лицам.',
      'privacy.note': 'Чтобы удалить заявку или переписку по проекту, напишите в WhatsApp или Telegram.',
      'footer.text': 'Камерная веб-студия. Якутск · онлайн по РФ.',
      'footer.site': 'сайт',
      'footer.formats': 'форматы',
      'footer.contacts': 'контакты',
      'footer.address': 'г. Якутск, ул. Лермонтова, 49, офис 202',
      'nav.services': 'услуги',
      'nav.cases': 'кейсы',
      'nav.pricing': 'цены',
      'nav.process': 'процесс',
      'nav.contact': 'контакты',
      'budget.discuss': 'обсудить',
      'budget.unknown': 'не знаю',
      'case.task': 'задача',
      'case.done': 'что сделано',
      'case.result': 'результат',
      'addons.title': 'дополнительно',
    },
    services: [
      {
        num: '01', title: 'лендинги под заявку',
        desc: 'Для услуги, запуска, записи или рекламы. Структура ведёт человека от первого экрана к обращению.',
        list: ['оффер и блоки доверия', 'форма или мессенджер', 'адаптив и базовое seo'],
      },
      {
        num: '02', title: 'сайт для бизнеса',
        desc: 'Для компании, которой нужно показать услуги, кейсы, FAQ, контакты и несколько смысловых направлений.',
        list: ['структура страниц', 'кейсы и услуги', 'подготовка к росту'],
      },
      {
        num: '03', title: 'админка и заявки',
        desc: 'По задаче подключается CMS/backend, статусы заявок, уведомления и редактирование контента.',
        list: ['цены и статьи', 'кейсы и фото', 'заявки в CRM или мессенджер'],
      },
    ],
    cases: [
      { kind: 'private menu system', title: 'solis × anna', task: 'закрытый интерфейс без публичной витрины', done: 'приватная структура, меню, доступ и аккуратный интерфейс', result: 'контент показывается только нужной аудитории', large: true },
      { kind: 'частный детский сад', title: 'детский сад', task: 'объяснить родителям услуги, доверие и способ связи', done: 'сайт, форма обратной связи, структура под родителей', result: 'можно отправлять одну понятную ссылку вместо длинных объяснений' },
      { kind: 'детский лагерь', title: 'future leaders camp', task: 'показать программу, безопасность и ценность лагеря', done: 'лендинг, блоки доверия, FAQ и заявка', result: 'родителям проще понять формат и оставить заявку' },
      { kind: 'ai / pwa / авто', title: 'ubaay диагностика', task: 'упаковать идею AI/PWA автодиагностики', done: 'концепт интерфейса, сценарии, мобильный формат', result: 'проект выглядит как продукт, а не сырая идея' },
    ],
    pricing: [
      { num: '01', title: 'мини-сайт / визитка', price: 'от 12 000 ₽', desc: 'для простого присутствия в интернете', note: 'мини-формат от 7 999 ₽ возможен для совсем короткой страницы' },
      { num: '02', title: 'лендинг', price: 'от 20 000 ₽', desc: 'для услуги, запуска, записи и заявок', note: 'структура под рекламу и быстрый контакт' },
      { num: '03', title: 'сайт для бизнеса', price: 'от 35 000 ₽', desc: 'для компании, нескольких страниц, структуры и SEO', note: 'основа для роста, кейсов, статей и админки' },
    ],
    addons: [
      'админка / редактирование контента — от 15 000 ₽',
      'интеграция заявок в Telegram/WhatsApp — по задаче',
      'доработки и поддержка — отдельно',
    ],
    process: [
      { num: '01', title: 'бриф', text: 'цель, ниша, аудитория, город, референсы и формат сайта.' },
      { num: '02', title: 'структура', text: 'собираем путь клиента от оффера до заявки.' },
      { num: '03', title: 'дизайн и сборка', text: 'визуал, адаптив, формы, базовая SEO-разметка.' },
      { num: '04', title: 'запуск', text: 'проверка, домен, инструкция и короткий период правок.' },
    ],
    faq: [
      { q: 'можно ли сделать сайт полностью онлайн?', a: 'да. бриф, структура, дизайн, правки и запуск могут проходить через мессенджеры и созвоны.' },
      { q: 'можно ли подключить заявки в WhatsApp или Telegram?', a: 'да. форма открывает подготовленный текст заявки, а для сложных проектов можно подключить backend или CRM.' },
      { q: 'админка входит в базовую цену?', a: 'нет. админка считается отдельно, если контент часто меняется или заявки нужно хранить в системе.' },
      { q: 'что нужно для старта?', a: 'достаточно ниши, цели, примеров сайтов, примерного бюджета и понимания, куда должны приходить заявки.' },
      { q: 'сколько занимает разработка?', a: 'срок зависит от объёма. простой лендинг быстрее, сайт с админкой и несколькими страницами требует больше этапов.' },
      { q: 'делаете ли вы seo?', a: 'да. на старте сайт получает базовую SEO/GEO-структуру: понятный title, description, schema.org и формулировки под Якутск, Москву и регион.' },
    ],
  },
  en: {
    i18n: {
      'hero.eyebrow': 'Yakutsk · online across Russia',
      'hero.title': 'websites that explain the offer and bring leads',
      'hero.titleAccent': 'explain the offer',
      'hero.lead': 'A compact web studio: landing pages and websites without a template look — structure, design, responsive layout and a clear path to contact.',
      'hero.primary': 'discuss project',
      'hero.secondary': 'view cases',
      'hero.proof1Title': 'no templates',
      'hero.proof1Text': 'visuals for the niche and task',
      'hero.proof2Title': 'mobile first',
      'hero.proof2Text': 'proper phone experience',
      'hero.proof3Title': 'leads',
      'hero.proof3Text': 'WhatsApp / Telegram',
      'hero.visual1': 'meaning',
      'hero.visual2': 'lead',
      'floatCta.label': 'message us on whatsapp',
      'services.eyebrow': 'services',
      'services.title': 'not "just design", but packaging before the lead',
      'services.text': 'The homepage keeps only the formats that are easy to sell and explain: landing page, business website, admin panel and lead flow.',
      'cases.eyebrow': 'cases',
      'cases.title': 'real tasks and the results they led to',
      'cases.text': 'Below are real briefs from our practice: what the client needed and the result the website delivers now.',
      'pricing.eyebrow': 'pricing',
      'pricing.title': 'packages as project starting points, not a block price list',
      'pricing.text': 'Price depends on structure, copy, screens, admin panel and integrations. These are clear starting points for the first conversation.',
      'process.eyebrow': 'process',
      'process.title': 'calm step-by-step work',
      'process.text': 'Task and structure first, then visuals, responsive layout, leads and launch.',
      'admin.eyebrow': 'admin / leads',
      'admin.title': 'an example of content editing',
      'admin.text': 'An admin panel is not presented as a default part of the base website. It is useful when prices, articles, cases, photos or lead statuses change often.',
      'admin.noteTitle': 'this is not just a mockup',
      'admin.noteText': 'The screen above illustrates the interface. But requests sent from this very page are really saved to a database and show up in a working admin panel.',
      'faq.eyebrow': 'faq',
      'faq.title': 'short and practical',
      'contact.eyebrow': 'contact',
      'contact.title': 'tell us what website you need',
      'contact.text': 'Fill out a short brief. WhatsApp will open with prepared text, and the request will be sent from your number.',
      'contact.quickTitle': 'quick request',
      'contact.quickBtn': 'send to whatsapp',
      'contact.quickMsg': 'WhatsApp opened with your request text. Check it and press send.',
      'contact.brief': 'short brief',
      'contact.files': 'References and files can be sent in the next WhatsApp or Telegram message.',
      'contact.briefBtn': 'send brief to whatsapp',
      'contact.briefMsg': 'WhatsApp opened with your brief. Check it and press send.',
      'contact.officeLabel': 'office',
      'contact.officeAddress': 'Yakutsk, 49 Lermontova St., office 202',
      'contact.officeYandex': 'Yandex Maps',
      'contact.office2gis': '2GIS',
      'contact.agreeText': 'I agree to data processing and the',
      'contact.agreeLink': 'personal data policy',
      'contact.formatLabel': 'format',
      'contact.formatOptions': 'mini website / card,landing page,business website,admin panel / leads,not sure, help me choose',
      'contact.namePH': 'name',
      'contact.contactPH': 'contact: whatsapp / telegram',
      'contact.projectPH': 'niche / project',
      'contact.messagePH': 'what needs to be done',
      'contact.quickNamePH': 'name',
      'contact.quickContactPH': 'telegram or whatsapp',
      'contact.quickNeedPH': 'what do you need',
      'privacy.eyebrow': 'data',
      'privacy.title': 'personal data policy',
      'privacy.text': 'sakhasites receives only the data a person sends through the form or messenger: name, contact and project details. It is stored to process the request and is not shared with third parties.',
      'privacy.note': 'To delete a request or project conversation, write in WhatsApp or Telegram.',
      'footer.text': 'A compact web studio. Yakutsk · online across Russia.',
      'footer.site': 'site',
      'footer.formats': 'formats',
      'footer.contacts': 'contacts',
      'footer.address': 'Yakutsk, 49 Lermontova St., office 202',
      'nav.services': 'services',
      'nav.cases': 'cases',
      'nav.pricing': 'pricing',
      'nav.process': 'process',
      'nav.contact': 'contact',
      'budget.discuss': 'discuss',
      'budget.unknown': 'not sure',
      'case.task': 'task',
      'case.done': 'work done',
      'case.result': 'value',
      'addons.title': 'add-ons',
    },
    services: [
      { num: '01', title: 'lead-focused landing pages', desc: 'For a service, launch, booking or ad campaign. Structure guides people from first screen to contact.', list: ['offer and trust blocks', 'form or messenger', 'responsive and SEO base'] },
      { num: '02', title: 'business websites', desc: 'For companies that need services, cases, FAQ, contacts and several directions.', list: ['page structure', 'cases and services', 'growth-ready base'] },
      { num: '03', title: 'admin panel and leads', desc: 'CMS/backend, lead statuses, notifications and content editing can be added by task.', list: ['prices and articles', 'cases and photos', 'CRM or messenger leads'] },
    ],
    cases: [
      { kind: 'private menu system', title: 'solis × anna', task: 'private interface without a public showcase', done: 'private structure, menu, access and clean UI', result: 'content is shown only to the right audience', large: true },
      { kind: 'private kindergarten', title: 'kindergarten', task: 'explain services, trust and contact path for parents', done: 'website, feedback form and parent-focused structure', result: 'one clear link replaces long explanations' },
      { kind: 'children camp', title: 'future leaders camp', task: 'show program, safety and camp value', done: 'landing page, trust blocks, FAQ and lead form', result: 'parents understand the format and leave requests faster' },
      { kind: 'ai / pwa / auto', title: 'ubaay diagnostics', task: 'package an AI/PWA car diagnostics idea', done: 'interface concept, flows and mobile format', result: 'the project feels like a product, not a raw idea' },
    ],
    pricing: [
      { num: '01', title: 'mini website / card', price: 'from 12,000 RUB', desc: 'for simple online presence', note: 'mini format from 7,999 RUB is possible for a very short page' },
      { num: '02', title: 'landing page', price: 'from 20,000 RUB', desc: 'for a service, launch, booking and leads', note: 'structure for ads and fast contact' },
      { num: '03', title: 'business website', price: 'from 35,000 RUB', desc: 'for a company, several pages, structure and SEO', note: 'base for growth, cases, articles and admin panel' },
    ],
    addons: [
      'admin panel / content editing — from 15,000 RUB',
      'Telegram/WhatsApp lead integration — by task',
      'edits and support — separately',
    ],
    process: [
      { num: '01', title: 'brief', text: 'goal, niche, audience, city, references and website format.' },
      { num: '02', title: 'structure', text: 'client path from offer to request.' },
      { num: '03', title: 'design and build', text: 'visuals, responsive layout, forms and basic SEO markup.' },
      { num: '04', title: 'launch', text: 'checks, domain, instruction and a short edit period.' },
    ],
    faq: [
      { q: 'can the website be built fully online?', a: 'yes. brief, structure, design, edits and launch can happen through messengers and calls.' },
      { q: 'can WhatsApp or Telegram leads be connected?', a: 'yes. the form opens prepared request text, and complex projects can use backend or CRM.' },
      { q: 'is admin included in the base price?', a: 'no. admin panel is estimated separately when content changes often or leads need storage.' },
      { q: 'what is needed to start?', a: 'niche, goal, reference sites, rough budget and where leads should go.' },
      { q: 'how long does development take?', a: 'depends on scope. a simple landing page is faster, a website with admin and multiple pages needs more stages.' },
      { q: 'do you handle seo?', a: 'yes. the site launches with a basic SEO/GEO setup: clear title, description, schema.org and local wording for Yakutsk, Moscow and the region.' },
    ],
  },
};

// ============================================================
// Supabase loader — загружает контент из БД, с fallback на static
// ============================================================

import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function loadLangData(lang: Lang): Promise<LangData> {
  const sb = getSupabase();
  const fallback = siteData[lang];

  if (!sb) return fallback;

  try {
    const [servR, casesR, pricR, addR, procR, faqR] = await Promise.all([
      sb.from('services').select('*').eq('lang', lang).eq('published', true).order('sort_order'),
      sb.from('cases').select('*').eq('lang', lang).eq('published', true).order('sort_order'),
      sb.from('pricing').select('*').eq('lang', lang).eq('published', true).order('sort_order'),
      sb.from('addons').select('*').eq('lang', lang).eq('published', true).order('sort_order'),
      sb.from('process_steps').select('*').eq('lang', lang).eq('published', true).order('sort_order'),
      sb.from('faq').select('*').eq('lang', lang).eq('published', true).order('sort_order'),
    ]);

    const services: ServiceItem[] = (servR.data ?? []).map((r: Record<string, unknown>) => ({
      num: r.num as string,
      title: r.title as string,
      desc: r.desc_text as string,
      list: (r.list_items as string[]) ?? [],
    }));

    const cases: CaseItem[] = (casesR.data ?? []).map((r: Record<string, unknown>) => ({
      kind: r.kind as string,
      title: r.title as string,
      task: r.task_text as string,
      done: r.done_text as string,
      result: r.result_text as string,
      large: r.is_large as boolean,
    }));

    const pricing: PricingItem[] = (pricR.data ?? []).map((r: Record<string, unknown>) => ({
      num: r.num as string,
      title: r.title as string,
      price: r.price as string,
      desc: r.desc_text as string,
      note: r.note_text as string,
    }));

    const addons: string[] = (addR.data ?? []).map((r: Record<string, unknown>) => r.text as string);

    const process: ProcessStep[] = (procR.data ?? []).map((r: Record<string, unknown>) => ({
      num: r.num as string,
      title: r.title as string,
      text: r.text as string,
    }));

    const faq: FaqItem[] = (faqR.data ?? []).map((r: Record<string, unknown>) => ({
      q: r.question as string,
      a: r.answer as string,
    }));

    // если данных нет в БД — возвращаем fallback
    return {
      i18n: fallback.i18n,
      services: services.length ? services : fallback.services,
      cases: cases.length ? cases : fallback.cases,
      pricing: pricing.length ? pricing : fallback.pricing,
      addons: addons.length ? addons : fallback.addons,
      process: process.length ? process : fallback.process,
      faq: faq.length ? faq : fallback.faq,
    };
  } catch {
    return fallback;
  }
}
