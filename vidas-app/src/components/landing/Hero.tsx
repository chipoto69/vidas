'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Github, Play } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-void-charcoal">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-electric-violet/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-acid-lime/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '1s' }} />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />
      </div>

      {/* Floating ASCII Elements (Decorative) */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-20 font-mono text-xs overflow-hidden">
        <motion.div style={{ y: y1, x: -100 }} className="absolute top-[20%] left-[10%] text-acid-lime">
          {'/* REALITY */'}
        </motion.div>
        <motion.div style={{ y: y2, x: 100 }} className="absolute bottom-[30%] right-[15%] text-electric-violet">
          {'// RERENDERED'}
        </motion.div>
        <div className="absolute top-[15%] right-[20%] animate-spin duration-[20s] text-white/10 text-4xl">+</div>
        <div className="absolute bottom-[20%] left-[20%] text-white/10 text-6xl">::</div>
      </div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-2 mb-8"
        >
          <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs font-mono text-accent uppercase tracking-widest mb-4">
            v1.0 Public Release
          </div>
          
          <h1 className="text-7xl md:text-9xl font-display font-black tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 select-none">
            <span className="block hover:scale-[1.02] transition-transform duration-500 origin-bottom cursor-default">REALITY,</span>
            <span className="block text-stroke hover:text-accent transition-colors duration-300 cursor-default">RERENDERED</span>
          </h1>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-muted-light max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Transform any video into living ASCII art. <br className="hidden md:block"/>
          WebGL accelerated. 60fps real-time rendering. No limits.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/studio">
            <Button size="lg" className="min-w-[180px] group">
              Open Studio 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="https://github.com" target="_blank">
            <Button variant="secondary" size="lg" className="min-w-[180px]">
              <Github className="w-4 h-4 mr-2" />
              View on GitHub
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
      
      {/* CSS for text stroke effect since it's not standard Tailwind */}
      <style jsx global>{`
        .text-stroke {
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
          color: transparent;
        }
        .text-stroke:hover {
          -webkit-text-stroke: 0px;
          color: var(--acid-lime);
        }
      `}</style>
    </section>
  );
}
