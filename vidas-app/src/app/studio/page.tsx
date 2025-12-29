'use client';

import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Settings2, 
  Play, 
  Pause, 
  Download,
  Share2,
  Maximize2
} from 'lucide-react';
import { Button, Panel } from '@/components/ui';
import { CanvasFrame } from '@/components/studio/CanvasFrame';
import { ControlPanel } from '@/components/studio/ControlPanel';
import { SourceSelector } from '@/components/studio/SourceSelector';
import { KeyboardShortcuts } from '@/components/studio/KeyboardShortcuts';
import { CharsetKey } from '@/components/studio/CharsetPicker';

const Video2Ascii = dynamic(
  () => import('@/lib/video2ascii').then((mod) => mod.Video2Ascii),
  { ssr: false }
);

export default function StudioPage() {
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [charset, setCharset] = useState<CharsetKey>('standard');
  const [numColumns, setNumColumns] = useState(120);
  const [brightness, setBrightness] = useState(1.0);
  const [colored, setColored] = useState(true);
  const [inputMode, setInputMode] = useState<'video' | 'camera' | 'url' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileSettings, setShowMobileSettings] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setError(null);
      setIsLoading(true);
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setInputMode('video');
      setIsLoading(false);
    }
  }, []);

  const handleUrlSubmit = useCallback((url: string) => {
    if (url) {
      setError(null);
      setVideoSrc(url);
      setInputMode('url');
    }
  }, []);

  const handleCameraAccess = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720, facingMode: 'user' } 
      });
      
      const video = document.createElement('video');
      video.srcObject = stream;
      video.muted = true;
      video.playsInline = true;
      await video.play();
      
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      
      const canvasStream = canvas.captureStream(30);
      const recorder = new MediaRecorder(canvasStream, { mimeType: 'video/webm' });
      const videoChunks: Blob[] = [];
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) videoChunks.push(e.data);
      };
      
      const drawFrame = () => {
        if (ctx && video.readyState >= 2) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
        requestAnimationFrame(drawFrame);
      };
      drawFrame();
      recorder.start(100);
      
      setTimeout(() => {
        recorder.stop();
        setTimeout(() => {
          if (videoChunks.length > 0) {
            const blob = new Blob(videoChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            setVideoSrc(url);
            setInputMode('camera');
          }
          setIsLoading(false);
        }, 100);
      }, 500);
      
      (window as Window & { __cameraCleanup?: () => void }).__cameraCleanup = () => {
        stream.getTracks().forEach(track => track.stop());
        video.remove();
      };
      
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      setError('Camera access denied. Please allow camera permissions and try again.');
    }
  }, []);

  return (
    <div className="h-screen w-screen bg-void-charcoal text-foreground overflow-hidden flex flex-col font-sans selection:bg-accent selection:text-void-charcoal">
      
      <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-void-charcoal/50 backdrop-blur-md z-40 relative">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-secondary hover:text-foreground transition-colors p-2 -ml-2 rounded-lg hover:bg-white/5">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-[1px] bg-white/10 hidden sm:block" />
          <h1 className="font-display font-bold text-xl tracking-tight hidden sm:block">Studio</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3">
            <Button variant="ghost" size="sm" icon={<Share2 className="w-4 h-4" />}>
              Share
            </Button>
            <Button variant="primary" size="sm" icon={<Download className="w-4 h-4" />}>
              Export
            </Button>
          </div>
          <button 
            className="lg:hidden p-2 text-secondary hover:text-foreground"
            onClick={() => setShowMobileSettings(true)}
          >
            <Settings2 className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        
        <div className="flex-1 flex flex-col relative z-0 overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-graphite-glass via-void-charcoal to-void-charcoal">
          <div className={`flex-1 flex items-center justify-center transition-all duration-500 ${isFullscreen ? 'p-0' : 'p-4 lg:p-8'}`}>
             <CanvasFrame isLoading={isLoading} error={error} onErrorDismiss={() => setError(null)}>
               {videoSrc && !error ? (
                  <div className="w-full h-full relative group">
                    <Video2Ascii
                      src={videoSrc}
                      isPlaying={isPlaying}
                      charset={charset}
                      numColumns={numColumns}
                      brightness={brightness}
                      colored={colored}
                      blend={0.5}
                      enableMouse={true}
                      enableRipple={true}
                      rippleSpeed={1.5}
                    />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button variant="glass" size="icon" onClick={() => setIsFullscreen(!isFullscreen)}>
                        <Maximize2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
               ) : (
                 <div className="text-center text-secondary animate-in fade-in zoom-in duration-500">
                   <div className="mb-6 p-4 rounded-full bg-white/5 w-20 h-20 mx-auto flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                      <div className="w-10 h-10 border-t-2 border-l-2 border-white/20 rounded-tl-lg" />
                   </div>
                   <p className="font-mono text-xs opacity-50 mb-6 tracking-[0.2em] text-accent">AWAITING INPUT SIGNAL</p>
                   <SourceSelector 
                      inputMode={inputMode}
                      onCameraAccess={handleCameraAccess}
                      onFileUpload={handleFileUpload}
                      onUrlSubmit={handleUrlSubmit}
                   />
                 </div>
               )}
             </CanvasFrame>
          </div>

          <AnimatePresence>
            {videoSrc && !error && (
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
              >
                <Panel variant="glass" padding="sm" className="flex items-center gap-4 rounded-full px-6 py-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-2xl">
                  <SourceSelector 
                    inputMode={inputMode}
                    onCameraAccess={handleCameraAccess}
                    onFileUpload={handleFileUpload}
                    onUrlSubmit={handleUrlSubmit}
                  />
                  <div className="h-8 w-[1px] bg-white/10" />
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-accent text-void-charcoal flex items-center justify-center hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.4)]"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>
                </Panel>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <aside className="hidden lg:block w-96 border-l border-white/5 bg-surface/30 backdrop-blur-xl relative z-20 shadow-2xl">
          <ControlPanel 
            charset={charset}
            setCharset={setCharset}
            numColumns={numColumns}
            setNumColumns={setNumColumns}
            brightness={brightness}
            setBrightness={setBrightness}
            colored={colored}
            setColored={setColored}
          />
        </aside>

        <AnimatePresence>
          {showMobileSettings && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-void-charcoal/80 backdrop-blur-sm z-50 lg:hidden"
                onClick={() => setShowMobileSettings(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed right-0 top-0 bottom-0 w-80 bg-surface z-50 border-l border-white/10 lg:hidden shadow-2xl flex flex-col"
              >
                <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 flex-shrink-0">
                  <h2 className="font-display font-bold">Settings</h2>
                  <button onClick={() => setShowMobileSettings(false)}>
                    <Settings2 className="w-5 h-5 text-accent" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <ControlPanel 
                    charset={charset}
                    setCharset={setCharset}
                    numColumns={numColumns}
                    setNumColumns={setNumColumns}
                    brightness={brightness}
                    setBrightness={setBrightness}
                    colored={colored}
                    setColored={setColored}
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </main>

      <KeyboardShortcuts />
    </div>
  );
}
