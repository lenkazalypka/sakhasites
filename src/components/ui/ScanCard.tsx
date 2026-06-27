'use client';
import { CornerMarks } from './HexCoord';

interface ScanCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  accent?: boolean;
  tag?: string;
  cornerColor?: string;
}

export function ScanCard({ children, style, accent, cornerColor }: ScanCardProps) {
  return (
    <div style={{
      position: 'relative',
      border: `1px solid ${accent ? 'rgba(215,245,111,.35)' : 'var(--line)'}`,
      background: accent ? 'rgba(215,245,111,.04)' : 'rgba(244,241,232,.025)',
      overflow: 'hidden',
      ...style,
    }}>
      {/* scanlines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,.07) 3px, rgba(0,0,0,.07) 4px)',
      }} />
      {/* corner marks */}
      <CornerMarks color={cornerColor ?? (accent ? 'rgba(215,245,111,.5)' : 'rgba(125,249,210,.3)')} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
