'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  icon?: React.ReactNode;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon,
  className,
  ...props 
}: ButtonProps) {
  const variants = {
    primary: "bg-accent text-void-charcoal hover:bg-accent/90 shadow-[0_0_20px_rgba(204,255,0,0.3)]",
    secondary: "bg-surface text-foreground hover:bg-white/10 border border-white/5",
    ghost: "bg-transparent text-secondary hover:text-foreground hover:bg-white/5",
    outline: "bg-transparent border border-white/20 text-foreground hover:border-accent hover:text-accent",
    glass: "bg-surface/50 backdrop-blur-md border border-white/10 text-foreground hover:bg-surface/70"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    icon: "p-2 min-w-[40px] h-[40px]"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {children}
    </motion.button>
  );
}
