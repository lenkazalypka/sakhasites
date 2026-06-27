-- ============================================================
-- sakhasites · полная схема Supabase
-- Supabase Dashboard → SQL Editor → New query → Run
-- ============================================================

create extension if not exists pgcrypto;

-- ─── ЗАЯВКИ ───────────────────────────────────────────────

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  source      text not null default 'quick' check (source in ('quick','brief')),
  status      text not null default 'новая',
  lang        text default 'ru',
  name        text,
  contact     text,
  need        text,
  project     text,
  format      text,
  budget      text,
  message     text,
  note        text,
  page_url    text,
  user_agent  text
);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- ─── УСЛУГИ ───────────────────────────────────────────────

create table if not exists public.services (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lang       text not null default 'ru',
  sort_order int not null default 0,
  num        text not null,
  title      text not null,
  desc_text  text not null,
  list_items text[] not null default '{}',
  published  boolean not null default true
);
create index if not exists services_lang_sort_idx on public.services (lang, sort_order);

-- ─── КЕЙСЫ ────────────────────────────────────────────────

create table if not exists public.cases (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  lang        text not null default 'ru',
  sort_order  int not null default 0,
  kind        text not null,
  title       text not null,
  task_text   text not null,
  done_text   text not null,
  result_text text not null,
  is_large    boolean not null default false,
  published   boolean not null default true
);
create index if not exists cases_lang_sort_idx on public.cases (lang, sort_order);

-- ─── ЦЕНЫ ─────────────────────────────────────────────────

create table if not exists public.pricing (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lang       text not null default 'ru',
  sort_order int not null default 0,
  num        text not null,
  title      text not null,
  price      text not null,
  desc_text  text not null,
  note_text  text not null,
  published  boolean not null default true
);
create index if not exists pricing_lang_sort_idx on public.pricing (lang, sort_order);

-- ─── АДДОНЫ ───────────────────────────────────────────────

create table if not exists public.addons (
  id         uuid primary key default gen_random_uuid(),
  lang       text not null default 'ru',
  sort_order int not null default 0,
  text       text not null,
  published  boolean not null default true
);

-- ─── ПРОЦЕСС ──────────────────────────────────────────────

create table if not exists public.process_steps (
  id         uuid primary key default gen_random_uuid(),
  lang       text not null default 'ru',
  sort_order int not null default 0,
  num        text not null,
  title      text not null,
  text       text not null,
  published  boolean not null default true
);

-- ─── FAQ ──────────────────────────────────────────────────

create table if not exists public.faq (
  id         uuid primary key default gen_random_uuid(),
  lang       text not null default 'ru',
  sort_order int not null default 0,
  question   text not null,
  answer     text not null,
  published  boolean not null default true
);

-- ============================================================
-- RLS
-- ============================================================

alter table public.leads         enable row level security;
alter table public.services      enable row level security;
alter table public.cases         enable row level security;
alter table public.pricing       enable row level security;
alter table public.addons        enable row level security;
alter table public.process_steps enable row level security;
alter table public.faq           enable row level security;

-- анонимы: только читать published + писать заявки
drop policy if exists "anon insert leads"    on public.leads;
drop policy if exists "anon read services"   on public.services;
drop policy if exists "anon read cases"      on public.cases;
drop policy if exists "anon read pricing"    on public.pricing;
drop policy if exists "anon read addons"     on public.addons;
drop policy if exists "anon read process"    on public.process_steps;
drop policy if exists "anon read faq"        on public.faq;

create policy "anon insert leads"  on public.leads         for insert to anon with check (true);
create policy "anon read services" on public.services      for select to anon using (published = true);
create policy "anon read cases"    on public.cases         for select to anon using (published = true);
create policy "anon read pricing"  on public.pricing       for select to anon using (published = true);
create policy "anon read addons"   on public.addons        for select to anon using (published = true);
create policy "anon read process"  on public.process_steps for select to anon using (published = true);
create policy "anon read faq"      on public.faq           for select to anon using (published = true);

-- авторизованные: полный CRUD
do $$ declare
  tbl text;
  ops text[] := array['select','insert','update','delete'];
  op  text;
begin
  foreach tbl in array array['leads','services','cases','pricing','addons','process_steps','faq'] loop
    foreach op in array ops loop
      execute format('drop policy if exists "auth %s %s" on public.%I', op, tbl, tbl);
      if op in ('select','delete') then
        execute format('create policy "auth %s %s" on public.%I for %s to authenticated using (true)', op, tbl, tbl, op);
      elsif op = 'insert' then
        execute format('create policy "auth %s %s" on public.%I for %s to authenticated with check (true)', op, tbl, tbl, op);
      else
        execute format('create policy "auth %s %s" on public.%I for %s to authenticated using (true) with check (true)', op, tbl, tbl, op);
      end if;
    end loop;
  end loop;
end $$;

-- ============================================================
-- SEED RU
-- ============================================================

insert into public.services (lang, sort_order, num, title, desc_text, list_items) values
('ru',1,'01','лендинги под заявку','Для услуги, запуска, записи или рекламы. Структура ведёт человека от первого экрана к обращению.',array['оффер и блоки доверия','форма или мессенджер','адаптив и базовое seo']),
('ru',2,'02','сайт для бизнеса','Для компании, которой нужно показать услуги, кейсы, FAQ, контакты и несколько смысловых направлений.',array['структура страниц','кейсы и услуги','подготовка к росту']),
('ru',3,'03','админка и заявки','По задаче подключается CMS/backend, статусы заявок, уведомления и редактирование контента.',array['цены и статьи','кейсы и фото','заявки в CRM или мессенджер'])
on conflict do nothing;

insert into public.cases (lang, sort_order, kind, title, task_text, done_text, result_text, is_large) values
('ru',1,'private menu system','solis × anna','закрытый интерфейс без публичной витрины','приватная структура, меню, доступ и аккуратный интерфейс','контент показывается только нужной аудитории',true),
('ru',2,'частный детский сад','детский сад','объяснить родителям услуги, доверие и способ связи','сайт, форма обратной связи, структура под родителей','можно отправлять одну понятную ссылку вместо длинных объяснений',false),
('ru',3,'детский лагерь','future leaders camp','показать программу, безопасность и ценность лагеря','лендинг, блоки доверия, FAQ и заявка','родителям проще понять формат и оставить заявку',false),
('ru',4,'ai / pwa / авто','ubaay диагностика','упаковать идею AI/PWA автодиагностики','концепт интерфейса, сценарии, мобильный формат','проект выглядит как продукт, а не сырая идея',false)
on conflict do nothing;

insert into public.pricing (lang, sort_order, num, title, price, desc_text, note_text) values
('ru',1,'01','мини-сайт / визитка','от 12 000 ₽','для простого присутствия в интернете','мини-формат от 7 999 ₽ возможен для совсем короткой страницы'),
('ru',2,'02','лендинг','от 20 000 ₽','для услуги, запуска, записи и заявок','структура под рекламу и быстрый контакт'),
('ru',3,'03','сайт для бизнеса','от 35 000 ₽','для компании, нескольких страниц, структуры и SEO','основа для роста, кейсов, статей и админки')
on conflict do nothing;

insert into public.addons (lang, sort_order, text) values
('ru',1,'админка / редактирование контента — от 15 000 ₽'),
('ru',2,'интеграция заявок в Telegram/WhatsApp — по задаче'),
('ru',3,'доработки и поддержка — отдельно')
on conflict do nothing;

insert into public.process_steps (lang, sort_order, num, title, text) values
('ru',1,'01','бриф','цель, ниша, аудитория, город, референсы и формат сайта.'),
('ru',2,'02','структура','собираем путь клиента от оффера до заявки.'),
('ru',3,'03','дизайн и сборка','визуал, адаптив, формы, базовая SEO-разметка.'),
('ru',4,'04','запуск','проверка, домен, инструкция и короткий период правок.')
on conflict do nothing;

insert into public.faq (lang, sort_order, question, answer) values
('ru',1,'можно ли сделать сайт полностью онлайн?','да. бриф, структура, дизайн, правки и запуск могут проходить через мессенджеры и созвоны.'),
('ru',2,'можно ли подключить заявки в WhatsApp или Telegram?','да. форма открывает подготовленный текст заявки, а для сложных проектов можно подключить backend или CRM.'),
('ru',3,'админка входит в базовую цену?','нет. админка считается отдельно, если контент часто меняется или заявки нужно хранить в системе.'),
('ru',4,'что нужно для старта?','достаточно ниши, цели, примеров сайтов, примерного бюджета и понимания, куда должны приходить заявки.'),
('ru',5,'сколько занимает разработка?','срок зависит от объёма. простой лендинг быстрее, сайт с админкой и несколькими страницами требует больше этапов.'),
('ru',6,'делаете ли вы seo?','да. на старте сайт получает базовую SEO/GEO-структуру: понятный title, description, schema.org и формулировки под Якутск, Москву и регион.')
on conflict do nothing;

-- ============================================================
-- SEED EN
-- ============================================================

insert into public.services (lang, sort_order, num, title, desc_text, list_items) values
('en',1,'01','landing pages for leads','For a service, launch, booking or ad campaign. Structure leads the visitor from the first screen to a request.',array['offer and trust blocks','form or messenger','responsive and basic seo']),
('en',2,'02','business website','For a company that needs to show services, cases, FAQ, contacts and several meaning directions.',array['page structure','cases and services','ready to grow']),
('en',3,'03','admin panel & leads','CMS/backend, lead statuses, notifications and content editing — added as needed.',array['prices and articles','cases and photos','leads to CRM or messenger'])
on conflict do nothing;

insert into public.cases (lang, sort_order, kind, title, task_text, done_text, result_text, is_large) values
('en',1,'private menu system','solis × anna','private interface without a public storefront','private structure, menu, access and a clean interface','content is shown only to the right audience',true),
('en',2,'private kindergarten','kindergarten','explain services, trust and contact options to parents','website, contact form, structure for parents','one clear link instead of long explanations',false),
('en',3,'summer camp','future leaders camp','show the program, safety and value of the camp','landing page, trust blocks, FAQ and lead form','parents find it easier to understand the format and apply',false),
('en',4,'ai / pwa / auto','ubaay diagnostics','package the AI/PWA auto-diagnostics idea','interface concept, scenarios, mobile-first format','the project looks like a product, not a raw idea',false)
on conflict do nothing;

insert into public.pricing (lang, sort_order, num, title, price, desc_text, note_text) values
('en',1,'01','mini-site / card','from ₽12 000','for a simple web presence','micro format from ₽7 999 for a very short page'),
('en',2,'02','landing page','from ₽20 000','for a service, launch, booking and leads','structured for ads and quick contact'),
('en',3,'03','business website','from ₽35 000','for a company, multiple pages, structure and SEO','foundation for growth, cases, articles and admin')
on conflict do nothing;

insert into public.addons (lang, sort_order, text) values
('en',1,'admin panel / content editing — from ₽15 000'),
('en',2,'lead integration into Telegram/WhatsApp — by task'),
('en',3,'updates and support — separately')
on conflict do nothing;

insert into public.process_steps (lang, sort_order, num, title, text) values
('en',1,'01','brief','goal, niche, audience, city, references and site format.'),
('en',2,'02','structure','we map the customer journey from offer to lead.'),
('en',3,'03','design & build','visuals, responsive layout, forms, basic SEO markup.'),
('en',4,'04','launch','review, domain, instructions and a short revision period.')
on conflict do nothing;

insert into public.faq (lang, sort_order, question, answer) values
('en',1,'can the whole project be done online?','yes. brief, structure, design, revisions and launch can all happen via messenger and calls.'),
('en',2,'can leads be sent to WhatsApp or Telegram?','yes. the form opens prepared text, and for complex projects we can connect a backend or CRM.'),
('en',3,'is the admin panel included in the base price?','no. it is priced separately when content changes often or leads need to be stored in a system.'),
('en',4,'what do we need to get started?','niche, goal, example sites, rough budget and where leads should go.'),
('en',5,'how long does development take?','it depends on scope. a simple landing is faster; a site with an admin panel and multiple pages takes more stages.'),
('en',6,'do you do seo?','yes. every site gets basic SEO/GEO structure: clean title, description, schema.org and phrasing for Yakutsk, Moscow and the region.')
on conflict do nothing;
