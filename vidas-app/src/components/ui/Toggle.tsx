'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function Toggle({ checked, onChange, label, className }: ToggleProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {label && <span className="text-sm font-medium text-secondary group-hover:text-foreground transition-colors">{label}</span>}
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          "w-12 h-7 rounded-full relative transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer",
          checked ? "bg-accent" : "bg-white/10"
        )}
        aria-pressed={checked}
      >
        <motion.div
          className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md"
          animate={{ x: checked ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}
