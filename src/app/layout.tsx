import type { Metadata } from 'next';
import './globals.css';
import { LangProvider } from '@/lib/lang-context';

export const metadata: Metadata = {
  title: 'sakhasites — сайты для бизнеса в Якутске, Москве и онлайн по России',
  description: 'sakhasites — камерная веб-студия для локального бизнеса и онлайн-проектов. Лендинги, сайты для бизнеса, заявки в WhatsApp/Telegram, адаптив и админка по задаче.',
  keywords: 'sakhasites, разработка сайтов Якутск, сайт для бизнеса Якутск, лендинг Якутск, веб студия Якутск',
  robots: 'index, follow, max-image-preview:large',
  openGraph: {
    type: 'website',
    title: 'sakhasites — сайты для бизнеса, которые приводят заявки',
    description: 'Лендинги и сайты для локального бизнеса без шаблонного вида. Якутск, Москва и онлайн по России.',
    url: 'https://sakhasites.ru/',
    images: [{ url: 'https://sakhasites.ru/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://sakhasites.ru/' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': 'https://sakhasites.ru/#studio',
      name: 'sakhasites',
      url: 'https://sakhasites.ru/',
      description: 'Разработка лендингов и сайтов для локального бизнеса и онлайн-проектов.',
      telephone: '+79951155316',
      address: { '@type': 'PostalAddress', streetAddress: 'ул. Лермонтова, 49, офис 202', addressLocality: 'Якутск', addressCountry: 'RU' },
      sameAs: ['https://t.me/lenaitt', 'https://wa.me/79951155316'],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%230d0e0b'/%3E%3Cpath d='M13 43L30 12h20L33 43H13z' fill='%23d7f56f'/%3E%3C/svg%3E" />
        <meta name="theme-color" content="#0d0e0b" />
        <meta name="color-scheme" content="dark" />
        <meta name="geo.region" content="RU-SA; RU-MOW" />
        <meta name="geo.placename" content="Якутск, Москва" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
