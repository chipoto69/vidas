'use client';

import React, { useEffect, useState } from 'react';
import { Modal } from '../ui/Modal';
import { Command } from 'lucide-react';

interface ShortcutGroup {
  category: string;
  items: {
    keys: string[];
    description: string;
  }[];
}

const shortcuts: ShortcutGroup[] = [
  {
    category: "General",
    items: [
      { keys: ["Space"], description: "Play/Pause" },
      { keys: ["?"], description: "Show Shortcuts" },
    ]
  },
  {
    category: "Controls",
    items: [
      { keys: ["1-8"], description: "Select Charset" },
      { keys: ["C"], description: "Toggle Color" },
    ]
  }
];

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-surface/50 backdrop-blur-md border border-white/10 text-secondary hover:text-foreground hover:bg-surface/80 transition-colors z-40 hidden lg:flex shadow-lg hover:shadow-accent/10"
        aria-label="Keyboard shortcuts"
      >
        <Command className="w-5 h-5" />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Keyboard Shortcuts"
      >
        <div className="grid gap-6">
          {shortcuts.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-medium text-secondary mb-3 uppercase tracking-wider">{group.category}</h3>
              <div className="grid gap-2">
                {group.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm">{item.description}</span>
                    <div className="flex gap-1">
                      {item.keys.map((key) => (
                        <kbd key={key} className="px-2 py-1 text-xs font-mono bg-white/10 rounded border border-white/10 min-w-[24px] text-center">
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
