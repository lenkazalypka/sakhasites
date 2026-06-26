import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  withLine?: boolean;
}

export function Eyebrow({ children, withLine = true }: Props) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      color: 'var(--accent)',
      fontFamily: 'var(--mono)',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '.14em',
      textTransform: 'uppercase',
    }}>
      {withLine && (
        <span style={{ width: 32, height: 1, background: 'var(--accent)', opacity: .8, flexShrink: 0 }} />
      )}
      {children}
    </div>
  );
}
