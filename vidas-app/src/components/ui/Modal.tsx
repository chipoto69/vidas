'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NoiseTexture } from '../shared/NoiseTexture';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-void-charcoal/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className={cn(
                "w-full max-w-lg bg-surface/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto",
                className
              )}
            >
              <NoiseTexture opacity={0.02} />
              <div className="relative z-10">
                <div className="flex items-center justify-between p-6 border-b border-white/5">
                  {title && <h2 className="text-xl font-display font-semibold">{title}</h2>}
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-secondary hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  {children}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
