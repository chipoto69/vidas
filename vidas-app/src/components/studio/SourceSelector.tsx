'use client';

import React from 'react';
import { Camera, Upload, Link as LinkIcon } from 'lucide-react';
import { Button } from '../ui/Button';

interface SourceSelectorProps {
  inputMode: 'video' | 'camera' | 'url' | null;
  onCameraAccess: () => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUrlSubmit: (url: string) => void;
}

export function SourceSelector({ inputMode, onCameraAccess, onFileUpload, onUrlSubmit }: SourceSelectorProps) {
  return (
    <div className="flex items-center gap-2 bg-surface/50 p-1.5 rounded-xl border border-white/5">
      <Button
        variant={inputMode === 'camera' ? 'primary' : 'ghost'}
        size="icon"
        onClick={onCameraAccess}
        aria-label="Use Camera"
        title="Use Camera"
      >
        <Camera className="w-4 h-4" />
      </Button>

      <div className="relative">
        <input 
          type="file" 
          accept="video/*" 
          onChange={onFileUpload} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
          aria-label="Upload video file"
        />
        <Button
          variant={inputMode === 'video' ? 'primary' : 'ghost'}
          size="icon"
          aria-hidden="true"
        >
          <Upload className="w-4 h-4" />
        </Button>
      </div>

      <Button
        variant={inputMode === 'url' ? 'primary' : 'ghost'}
        size="icon"
        onClick={() => {
          const url = prompt('Enter video URL:');
          if (url) onUrlSubmit(url);
        }}
        aria-label="Load from URL"
        title="Load from URL"
      >
        <LinkIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
