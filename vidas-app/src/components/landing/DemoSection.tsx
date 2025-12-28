'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function DemoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={containerRef} className="py-20 px-4 flex flex-col items-center justify-center bg-void-charcoal overflow-hidden">
      <motion.div 
        style={{ scale, opacity }}
        className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black"
      >
        {/* Simulated ASCII Interface */}
        <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
          {/* Static ASCII Art Placeholder (Grid of characters) */}
          <div className="absolute inset-0 text-[8px] leading-[8px] font-mono text-white/20 whitespace-pre overflow-hidden select-none opacity-50 mix-blend-screen">
            {Array.from({ length: 60 }).map((_, i) => (
              <div key={i}>{
                Array.from({ length: 120 }).map(() => 
                  ['.', ':', ';', '*', '#', '@', ' '][Math.floor(Math.random() * 7)]
                ).join('')
              }</div>
            ))}
          </div>
          
          {/* "Play" Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-void-charcoal/80 to-transparent">
             <div className="text-center">
               <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 text-white">
                 Living ASCII Art
               </h3>
               <p className="text-muted-light mb-8">
                 Transform any video stream in real-time.
               </p>
               <div className="px-4 py-2 rounded-full border border-accent/50 text-accent text-sm font-mono animate-pulse">
                 ● LIVE PREVIEW
               </div>
             </div>
          </div>
        </div>

        {/* Floating Scanline */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent h-[20%] w-full animate-float opacity-30 pointer-events-none" style={{ animationDuration: '3s' }} />
      </motion.div>
    </section>
  );
}
