'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/5 bg-void-charcoal">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="font-display font-bold text-xl tracking-tight">VIDAS</Link>
          <p className="text-sm text-muted">
            Reality, Rerendered.
          </p>
        </div>
        
        <div className="flex items-center gap-8 text-sm text-muted-light">
          <Link href="/studio" className="hover:text-white transition-colors">Studio</Link>
          <Link href="https://github.com" target="_blank" className="hover:text-white transition-colors">GitHub</Link>
          <Link href="https://twitter.com" target="_blank" className="hover:text-white transition-colors">Twitter</Link>
        </div>

        <div className="text-xs text-white/20">
          © 2025 VIDAS. Built with WebGL & ASCII dreams.
        </div>
      </div>
    </footer>
  );
}
