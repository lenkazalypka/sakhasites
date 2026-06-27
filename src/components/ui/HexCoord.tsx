'use client';

export function HexCoord({ x, y, style }: { x: string; y: string; style?: React.CSSProperties }) {
  return (
    <div style={{
      fontFamily: 'var(--mono)', fontSize: 9, color: 'rgba(125,249,210,.28)',
      letterSpacing: '.1em', userSelect: 'none', pointerEvents: 'none',
      ...style,
    }}>
      {x}<br />{y}
    </div>
  );
}

export function CornerMarks({ color = 'rgba(215,245,111,.3)' }: { color?: string }) {
  const mark: React.CSSProperties = { position: 'absolute', width: 10, height: 10, pointerEvents: 'none' };
  return (
    <>
      <span style={{ ...mark, top: -1, left: -1, borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` }} />
      <span style={{ ...mark, top: -1, right: -1, borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` }} />
      <span style={{ ...mark, bottom: -1, left: -1, borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` }} />
      <span style={{ ...mark, bottom: -1, right: -1, borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` }} />
    </>
  );
}
