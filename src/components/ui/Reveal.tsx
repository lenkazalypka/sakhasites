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
    <Tag ref={ref} style={{ transitionDelay: delay ? `${delay}s` : undefined, ...style }} className={className}>
      {children}
    </Tag>
  );
}
