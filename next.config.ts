import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Генерация статики для максимальной скорости
  // output: 'export', // раскомментируйте для полного static export (без /admin динамики)
  
  // Оптимизация изображений
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Убирает X-Powered-By header
  poweredByHeader: false,

  // Строгий режим React
  reactStrictMode: true,
};

export default nextConfig;
