'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: readonly Option[] | Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export function Select({ options, value, onChange, label, className }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      {label && <label className="block text-sm font-medium text-secondary mb-2">{label}</label>}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-surface border border-white/10 rounded-lg px-4 py-2.5 text-sm text-foreground hover:border-white/20 transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
      >
        <span className="capitalize">{selectedOption?.label}</span>
        <ChevronDown className={cn("w-4 h-4 text-secondary transition-transform", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-[#1C1C21] border border-white/10 rounded-lg shadow-xl overflow-hidden max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors hover:bg-white/5",
                  option.value === value ? "text-accent bg-accent/5" : "text-secondary"
                )}
              >
                <span className="capitalize">{option.label}</span>
                {option.value === value && <Check className="w-3.5 h-3.5 text-accent" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
