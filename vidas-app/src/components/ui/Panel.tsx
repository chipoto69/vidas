'use client';

import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NoiseTexture } from '../shared/NoiseTexture';

interface PanelProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: 'glass' | 'solid' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  withNoise?: boolean;
}

export function Panel({ 
  children, 
  className, 
  variant = 'glass', 
  padding = 'md',
  withNoise = true,
  ...props 
}: PanelProps) {
  const baseStyles = "relative overflow-hidden rounded-2xl transition-colors duration-300";
  
  const variants = {
    glass: "bg-surface/60 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/20",
    solid: "bg-surface border border-white/5",
    bordered: "bg-transparent border border-white/10 hover:border-white/20",
  };

  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <motion.div 
      className={cn(baseStyles, variants[variant], paddings[padding], className)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {withNoise && <NoiseTexture opacity={0.02} />}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
