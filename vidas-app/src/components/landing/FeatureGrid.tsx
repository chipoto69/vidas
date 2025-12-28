'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Type, MousePointer2, Palette, Download, Code2, Monitor, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    title: "WebGL Acceleration",
    description: "Powered by custom GLSL shaders for silky smooth 60fps rendering on any device.",
    icon: <Zap className="w-6 h-6 text-acid-lime" />,
    className: "md:col-span-2 md:row-span-2",
    gradient: "from-acid-lime/10 to-transparent"
  },
  {
    title: "8 ASCII Charsets",
    description: "From classic IBM CGA to modern matrix rain, switch instantly between 8 curated sets.",
    icon: <Type className="w-6 h-6 text-electric-violet" />,
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-electric-violet/10 to-transparent"
  },
  {
    title: "Interactive Effects",
    description: "Mouse trails, ripples, and audio-reactive distortions bring your ASCII art to life.",
    icon: <MousePointer2 className="w-6 h-6 text-sky-400" />,
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-sky-400/10 to-transparent"
  },
  {
    title: "Color Modes",
    description: "Full spectrum true-color or monochrome phosphor aesthetics.",
    icon: <Palette className="w-6 h-6 text-pink-500" />,
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-pink-500/10 to-transparent"
  },
  {
    title: "Export Ready",
    description: "Record high-quality video or capture frames directly from the canvas.",
    icon: <Download className="w-6 h-6 text-orange-400" />,
    className: "md:col-span-1 md:row-span-1",
    gradient: "from-orange-400/10 to-transparent"
  },
  {
    title: "Open Source",
    description: "MIT licensed. Built with React 19, Next.js 16, and pure creative chaos.",
    icon: <Code2 className="w-6 h-6 text-white" />,
    className: "md:col-span-2 md:row-span-1",
    gradient: "from-white/5 to-transparent"
  }
];

export function FeatureGrid() {
  return (
    <section className="py-32 px-4 bg-void-charcoal relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Under the Hood</h2>
          <p className="text-muted-light max-w-2xl mx-auto">
            Built for performance, designed for expression. A complete creative suite in your browser.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className={cn(
                "group relative p-8 rounded-3xl overflow-hidden border border-white/5 bg-surface/30 backdrop-blur-sm hover:border-white/10 transition-colors",
                feature.className
              )}
            >
              {/* Gradient Blob */}
              <div className={cn(
                "absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-50 transition-opacity duration-500 bg-gradient-to-br",
                feature.gradient
              )} />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="p-3 bg-white/5 w-fit rounded-xl border border-white/5 group-hover:bg-white/10 transition-colors">
                  {feature.icon}
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-white transition-colors">{feature.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
