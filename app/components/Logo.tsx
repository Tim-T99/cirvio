import { useId } from 'react';

export default function Logo({
  width = 140,
  color = 'currentColor',
  className,
}: {
  width?: number;
  color?: string;
  className?: string;
}) {
  const uid = useId();
  const height = Math.round(width * (240 / 720));
  const maskId = `ring-cut-${uid.replace(/:/g, '')}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 720 240"
      width={width}
      height={height}
      fill="none"
      style={{ color }}
      className={className}
      aria-label="Cirvio"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="720" height="240">
          <rect width="720" height="240" fill="white" />
          <text
            x="360"
            y="138"
            textAnchor="middle"
            fill="black"
            style={{
              fontFamily: "'Jost', system-ui, sans-serif",
              fontWeight: 200,
              fontSize: 56,
              letterSpacing: 18,
              paintOrder: 'stroke',
              stroke: 'black',
              strokeWidth: 14,
            } as React.CSSProperties}
          >
            CIRVIO
          </text>
        </mask>
      </defs>
      <circle cx="360" cy="120" r="100" stroke="currentColor" strokeWidth="1.25" mask={`url(#${maskId})`} />
      <text
        x="360"
        y="138"
        textAnchor="middle"
        fill="currentColor"
        style={{
          fontFamily: "'Jost', system-ui, sans-serif",
          fontWeight: 200,
          fontSize: 56,
          letterSpacing: 18,
        } as React.CSSProperties}
      >
        CIRVIO
      </text>
      <circle cx="260" cy="120" r="2.6" fill="currentColor" />
      <circle cx="460" cy="120" r="2.6" fill="currentColor" />
    </svg>
  );
}
