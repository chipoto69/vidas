'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Sparkles, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero (approx 500px)
      const show = window.scrollY > 500;
      if (show !== isVisible) {
        setIsVisible(show);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'circOut' }}
          className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        >
          <div className="glass-strong rounded-full px-2 py-2 pl-6 flex items-center gap-8 shadow-2xl pointer-events-auto border border-white/10">
            <Link href="/" className="font-display font-bold text-lg tracking-tight hover:text-accent transition-colors">
              VIDAS
            </Link>
            
            <div className="flex items-center gap-2">
               <Link href="https://github.com" target="_blank" className="p-2 text-secondary hover:text-white transition-colors">
                 <Github className="w-5 h-5" />
               </Link>
              <Link href="/studio">
                <Button size="sm" variant="primary" icon={<Sparkles className="w-3 h-3" />}>
                  Open Studio
                </Button>
              </Link>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
