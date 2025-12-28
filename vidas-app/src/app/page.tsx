'use client';

import React from 'react';
import { Hero, FeatureGrid, CharsetShowcase, CTASection, Footer, Navigation, DemoSection } from '@/components/landing';

export default function Home() {
  return (
    <div className="min-h-screen bg-void-charcoal text-white overflow-x-hidden selection:bg-acid-lime selection:text-void-charcoal">
      <Navigation />
      
      <main>
        <Hero />
        
        <DemoSection />
        
        <FeatureGrid />
        
        <CharsetShowcase />
        
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
