import React from 'react';

export function NoiseTexture({ opacity = 0.03, className = '' }: { opacity?: number; className?: string }) {
  return (
    <div 
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg className="h-full w-full opacity-[var(--opacity)]" style={{ '--opacity': opacity } as React.CSSProperties}>
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.6" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
