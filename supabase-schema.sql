-- sakhasites · схема Supabase для заявок (leads)
-- Выполните этот файл целиком:
--   Supabase Dashboard → SQL Editor → New query → вставьте всё → Run

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  source      text not null default 'quick' check (source in ('quick','brief')),
  status      text not null default 'новая',
  lang        text default 'ru',
  name        text,
  contact     text,
  need        text,       -- быстрая заявка: «что нужно»
  project     text,       -- бриф: ниша/проект
  format      text,       -- бриф: формат сайта
  budget      text,       -- бриф: бюджет
  message     text,       -- бриф: текст задачи
  note        text,       -- внутренняя заметка администратора
  page_url    text,
  user_agent  text
);

-- индекс для сортировки по дате в админке
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- RLS
alter table public.leads enable row level security;

-- анонимные посетители сайта могут ТОЛЬКО создавать заявки
drop policy if exists "Anyone can submit a lead" on public.leads;
create policy "Anyone can submit a lead"
  on public.leads for insert
  to anon
  with check (true);

-- авторизованные пользователи (Supabase Auth) видят все заявки
drop policy if exists "Authenticated can read leads" on public.leads;
create policy "Authenticated can read leads"
  on public.leads for select
  to authenticated
  using (true);

drop policy if exists "Authenticated can update leads" on public.leads;
create policy "Authenticated can update leads"
  on public.leads for update
  to authenticated
  using (true);

drop policy if exists "Authenticated can delete leads" on public.leads;
create policy "Authenticated can delete leads"
  on public.leads for delete
  to authenticated
  using (true);

-- Realtime (опционально, чтобы заявки появлялись без перезагрузки):
-- Dashboard → Database → Replication → добавьте таблицу "leads"
-- alter publication supabase_realtime add table public.leads;
