'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CHARSETS = [
  { name: 'Standard', chars: ' .:-=+*#%@' },
  { name: 'Blocks', chars: ' ░▒▓█' },
  { name: 'Binary', chars: ' 01' },
  { name: 'Minimal', chars: ' .*' },
  { name: 'Matrix', chars: ' ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ' },
  { name: 'Arrows', chars: ' ↑↗→↘↓↙←↖' },
  { name: 'Dots', chars: ' ⠁⠃⠇⠏⠟⠿' },
  { name: 'Extended', chars: ' .:-=+*#%@$W&8' },
];

export function CharsetShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <section ref={containerRef} className="py-24 bg-void-charcoal overflow-hidden border-y border-white/5 relative">
       {/* Background noise texture */}
       <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay pointer-events-none" />

       <div className="max-w-7xl mx-auto px-4 mb-12">
         <h2 className="text-3xl font-display font-bold text-center">Eight Distinct Aesthetics</h2>
       </div>

      <div className="flex relative">
        <motion.div style={{ x }} className="flex gap-8 px-8">
          {[...CHARSETS, ...CHARSETS].map((charset, i) => (
            <div 
              key={i}
              className="flex-shrink-0 w-80 h-48 bg-surface/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-accent/50 transition-colors group cursor-crosshair"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-mono text-muted group-hover:text-accent transition-colors">
                  0{i % 8 + 1} // {charset.name.toUpperCase()}
                </span>
                <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-accent group-hover:animate-pulse" />
              </div>
              
              <div className="font-mono text-2xl tracking-widest break-all leading-relaxed text-white/80 group-hover:text-white transition-colors">
                {charset.chars}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
