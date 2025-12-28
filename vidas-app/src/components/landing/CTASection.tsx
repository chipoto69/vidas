'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-32 px-4 relative overflow-hidden flex items-center justify-center min-h-[60vh]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-void-charcoal">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-violet/10 rounded-full blur-[100px] animate-pulse-glow" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tighter"
        >
          Ready to transform <br/>
          <span className="text-gradient-accent">reality?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-light mb-12 max-w-2xl mx-auto"
        >
          Join thousands of digital artists and developers pushing the boundaries of WebGL ASCII art.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/studio">
            <Button size="lg" className="h-16 px-10 text-lg bg-white text-black hover:bg-white/90 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
              Enter Studio
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
