'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const charsets = ['standard', 'detailed', 'blocks', 'minimal', 'binary', 'dots', 'arrows', 'emoji'] as const;
export type CharsetKey = typeof charsets[number];

interface CharsetPickerProps {
  value: CharsetKey;
  onChange: (value: CharsetKey) => void;
}

export function CharsetPicker({ value, onChange }: CharsetPickerProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {charsets.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={cn(
            "px-3 py-3 rounded-xl text-xs font-mono transition-all duration-300 relative overflow-hidden group min-h-[50px]",
            value === c 
              ? "bg-accent text-void-charcoal font-bold shadow-[0_0_15px_rgba(204,255,0,0.3)]" 
              : "bg-white/5 text-secondary hover:text-foreground hover:bg-white/10 border border-white/5"
          )}
        >
          {value === c && (
            <motion.div
              layoutId="active-charset"
              className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 pointer-events-none"
            />
          )}
          <span className="relative z-10 capitalize">{c}</span>
        </button>
      ))}
    </div>
  );
}
