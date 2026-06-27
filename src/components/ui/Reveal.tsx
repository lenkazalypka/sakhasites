'use client';

import { useReveal } from '@/lib/use-reveal';
import type { CSSProperties, ElementType, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
  className?: string;
  tag?: ElementType;
}

export function Reveal({ children, delay = 0, style, className, tag: Tag = 'div' }: Props) {
  const ref = useReveal();
  return (
    // data-reveal="true" включает CSS-скрытие до JS
    // JS потом меняет на data-reveal="done" — показывает элемент
    <Tag
      ref={ref}
      data-reveal="true"
      style={{
        transitionDelay: delay ? `${delay}s` : undefined,
        ...style,
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}
