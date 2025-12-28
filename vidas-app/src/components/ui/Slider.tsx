'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
  label?: string;
  displayValue?: string | number;
}

export function Slider({ value, min, max, step = 1, onChange, className, label, displayValue }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("w-full group", className)}>
      {(label || displayValue) && (
        <div className="flex justify-between items-center mb-3">
          {label && <label className="text-sm font-medium text-secondary group-hover:text-foreground transition-colors">{label}</label>}
          {displayValue && <span className="font-mono text-xs text-accent bg-accent/10 px-2 py-0.5 rounded">{displayValue}</span>}
        </div>
      )}
      <div className="relative h-6 flex items-center">
        <div className="absolute w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
           <div 
             className="h-full bg-gradient-to-r from-accent/50 to-accent transition-all duration-100 ease-out"
             style={{ width: `${percentage}%` }}
           />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div 
          className="pointer-events-none absolute h-4 w-4 rounded-full bg-white shadow-[0_0_10px_rgba(204,255,0,0.5)] border-2 border-accent transition-all duration-100 ease-out group-hover:scale-125"
          style={{ left: `calc(${percentage}% - 8px)` }}
        >
          <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-accent" />
        </div>
      </div>
    </div>
  );
}
