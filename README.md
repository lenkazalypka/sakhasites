# sakhasites · Next.js

Лендинг веб-студии sakhasites, переписанный на **Next.js 16 (App Router)**.  
Двуязычный (RU/EN), интеграция Supabase, форма → WhatsApp, /admin панель заявок.

---

## Быстрый старт

```bash
npm install
cp .env.example .env.local   # заполните своими ключами
npm run dev                  # http://localhost:3000
```

---

## Переменные окружения (.env.local)

| Переменная | Где взять | Описание |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API | URL проекта |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API | Anon public key (не service_role!) |
| `NEXT_PUBLIC_ADMIN_PASS` | придумайте сами | Пароль входа в /admin |

---

## Supabase: создание таблицы заявок

1. Откройте **Supabase Dashboard → SQL Editor → New query**
2. Вставьте содержимое файла `supabase-schema.sql`
3. Нажмите **Run**

Таблица `leads` создастся с RLS: анонимы могут только вставлять, авторизованные — читать/обновлять/удалять.

---

## Деплой на Vercel (рекомендуется)

### Вариант A — через CLI

```bash
npm i -g vercel
vercel            # следуйте подсказкам
```

### Вариант B — через GitHub

1. Залейте проект в GitHub репозиторий
2. Зайдите на [vercel.com](https://vercel.com) → **Add New Project** → выберите репо
3. В разделе **Environment Variables** добавьте три переменные из `.env.example`
4. Нажмите **Deploy**

> `vercel.json` уже настроен: security headers, кэш статики, блокировка /admin от индексации.

### Вариант C — другой хостинг (Node.js)

```bash
npm run build
npm start         # порт 3000 по умолчанию
```

---

## Структура проекта

```
src/
├── app/
│   ├── layout.tsx          — корневой layout, метаданные, JSON-LD
│   ├── page.tsx            — главная страница (сборка секций)
│   ├── globals.css         — CSS-переменные, базовые стили
│   └── admin/
│       ├── page.tsx        — метаданные (noindex)
│       └── AdminClient.tsx — панель заявок (client component)
├── components/
│   ├── sections/           — Navbar, Hero, Services, Cases, Pricing...
│   └── ui/                 — Reveal, PulseDot, Eyebrow, ProgressBar
└── lib/
    ├── data.ts             — весь контент (RU/EN)
    ├── lang-context.tsx    — React Context для переключения языка
    ├── supabase.ts         — клиент Supabase + saveLead()
    └── use-reveal.ts       — IntersectionObserver hook
```

---

## Чек-лист перед запуском

- [ ] Заполнен `.env.local` (Supabase URL + Key + Admin пароль)
- [ ] Выполнен `supabase-schema.sql` в Supabase SQL Editor
- [ ] Обновлён `sitemap.xml` с реальным доменом
- [ ] Обновлён `robots.txt` с реальным доменом в Sitemap
- [ ] Заменены все `https://sakhasites.ru/` в `layout.tsx` на реальный домен
- [ ] Добавлен `og-image.jpg` в `/public/`
- [ ] Настроен кастомный домен в Vercel (или другом хостинге)
