'use client';

import React from 'react';
import { Panel } from '../ui/Panel';
import { Slider } from '../ui/Slider';
import { Toggle } from '../ui/Toggle';
import { CharsetPicker, CharsetKey } from './CharsetPicker';
import { Sparkles, Volume2, Waves, Download } from 'lucide-react';

interface ControlPanelProps {
  charset: CharsetKey;
  setCharset: (c: CharsetKey) => void;
  numColumns: number;
  setNumColumns: (n: number) => void;
  brightness: number;
  setBrightness: (n: number) => void;
  colored: boolean;
  setColored: (b: boolean) => void;
}

export function ControlPanel({ 
  charset, 
  setCharset, 
  numColumns, 
  setNumColumns, 
  brightness, 
  setBrightness,
  colored,
  setColored
}: ControlPanelProps) {
  return (
    <Panel className="w-full h-full flex flex-col gap-8 overflow-y-auto custom-scrollbar" variant="glass" padding="lg">
      <div>
        <h2 className="text-sm font-medium text-secondary mb-4 uppercase tracking-wider">Charset</h2>
        <CharsetPicker value={charset} onChange={setCharset} />
      </div>

      <div className="space-y-6">
        <h2 className="text-sm font-medium text-secondary mb-2 uppercase tracking-wider">Adjustment</h2>
        <Slider 
          label="Density" 
          value={numColumns} 
          min={40} 
          max={200} 
          onChange={setNumColumns} 
          displayValue={numColumns}
        />
        <Slider 
          label="Brightness" 
          value={brightness} 
          min={0.5} 
          max={2} 
          step={0.1}
          onChange={setBrightness} 
          displayValue={brightness.toFixed(1)}
        />
        <Toggle 
          label="Color Mode" 
          checked={colored} 
          onChange={setColored} 
        />
      </div>

      <div className="pt-6 border-t border-white/5">
        <h2 className="text-sm font-medium text-premium mb-4 flex items-center gap-2 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          Premium Features
        </h2>
        <div className="space-y-2 opacity-60 pointer-events-none">
          <PremiumFeature icon={<Volume2 className="w-4 h-4" />} name="Audio Reactivity" />
          <PremiumFeature icon={<Waves className="w-4 h-4" />} name="Wave Warp" />
          <PremiumFeature icon={<Download className="w-4 h-4" />} name="4K Export" />
        </div>
      </div>
    </Panel>
  );
}

function PremiumFeature({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-surface/30 border border-white/5">
      <div className="flex items-center gap-3 text-sm text-secondary">
        {icon}
        <span>{name}</span>
      </div>
      <span className="text-xs font-mono text-premium/50">LOCKED</span>
    </div>
  );
}
