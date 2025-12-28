'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NoiseTexture } from '../shared/NoiseTexture';

interface CanvasFrameProps {
  children: React.ReactNode;
  isLoading?: boolean;
  error?: string | null;
  onErrorDismiss?: () => void;
}

export function CanvasFrame({ children, isLoading, error, onErrorDismiss }: CanvasFrameProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 lg:p-8">
      <motion.div 
        layout
        className="relative w-full h-full max-w-7xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 group"
      >
        <div className="absolute inset-0 z-20 pointer-events-none rounded-3xl ring-1 ring-white/10 ring-inset shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
        <NoiseTexture opacity={0.05} className="z-30 pointer-events-none mix-blend-overlay" />
        
        <div className="absolute inset-0 z-30 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />

        <div className="relative z-10 w-full h-full bg-void-charcoal flex items-center justify-center">
          {children}
        </div>

        {error && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-void-charcoal/90 backdrop-blur-md">
            <div className="text-center p-6 max-w-md">
              <p className="text-error mb-4 font-medium">{error}</p>
              <button 
                onClick={onErrorDismiss}
                className="px-6 py-2 bg-surface text-primary rounded-lg hover:bg-surface/80 transition-colors border border-white/10"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-void-charcoal/90 backdrop-blur-md">
            <div className="flex flex-col items-center gap-4 text-secondary">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              <span className="font-mono text-sm tracking-wider">INITIALIZING SYSTEM...</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
