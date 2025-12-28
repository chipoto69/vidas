/**
 * @module webgl/types
 * @description Type definitions for the video2ascii WebGL rendering system.
 */

import type { CharsetKey } from "../ascii-charsets";

/**
 * Width-to-height ratio for monospace characters.
 * Used to calculate proper grid dimensions.
 */
export const CHAR_WIDTH_RATIO = 0.6;

/**
 * Performance statistics for the ASCII renderer.
 */
export interface AsciiStats {
  /** Current frames per second */
  fps: number;
  /** Time in milliseconds to render last frame */
  frameTime: number;
}

/**
 * Dimensions of the ASCII character grid.
 */
export interface GridDimensions {
  /** Number of character columns */
  cols: number;
  /** Number of character rows */
  rows: number;
}

// Function that feature hooks register to set their uniforms each frame
export type UniformSetter = (
  gl: WebGL2RenderingContext,
  program: WebGLProgram,
  locations: UniformLocations
) => void;

// Cached uniform locations - looked up once at init, used every frame
export interface UniformLocations {
  // Core
  u_video: WebGLUniformLocation | null;
  u_asciiAtlas: WebGLUniformLocation | null;
  u_resolution: WebGLUniformLocation | null;
  u_charSize: WebGLUniformLocation | null;
  u_gridSize: WebGLUniformLocation | null;
  u_numChars: WebGLUniformLocation | null;
  u_colored: WebGLUniformLocation | null;
  u_blend: WebGLUniformLocation | null;
  u_highlight: WebGLUniformLocation | null;
  u_brightness: WebGLUniformLocation | null;

  // Mouse
  u_mouse: WebGLUniformLocation | null;
  u_mouseRadius: WebGLUniformLocation | null;
  u_trailLength: WebGLUniformLocation | null;
  u_trail: (WebGLUniformLocation | null)[];

  // Ripple
  u_time: WebGLUniformLocation | null;
  u_rippleEnabled: WebGLUniformLocation | null;
  u_rippleSpeed: WebGLUniformLocation | null;
  u_ripples: (WebGLUniformLocation | null)[];

  // Audio
  u_audioLevel: WebGLUniformLocation | null;
  u_audioReactivity: WebGLUniformLocation | null;
  u_audioSensitivity: WebGLUniformLocation | null;
}

// Hook Options
export interface UseVideoToAsciiOptions {
  fontSize?: number;
  colored?: boolean;
  blend?: number;
  highlight?: number;
  brightness?: number;
  charset?: CharsetKey;
  maxWidth?: number;
  numColumns?: number;
  enableSpacebarToggle?: boolean;
  onStats?: (stats: AsciiStats) => void;
}

export interface UseAsciiMouseEffectOptions {
  enabled?: boolean;
  trailLength?: number;
}

export interface UseAsciiRippleOptions {
  enabled?: boolean;
  speed?: number;
}

export interface UseAsciiAudioOptions {
  enabled?: boolean;
  reactivity?: number;
  sensitivity?: number;
}

// Context returned by useVideoToAscii
export interface AsciiContext {
  containerRef: React.RefObject<HTMLDivElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  glRef: React.RefObject<WebGL2RenderingContext | null>;
  programRef: React.RefObject<WebGLProgram | null>;
  uniformLocationsRef: React.RefObject<UniformLocations | null>;
  registerUniformSetter: (id: string, setter: UniformSetter) => void;
  unregisterUniformSetter: (id: string) => void;
  dimensions: GridDimensions;
  stats: AsciiStats;
  isReady: boolean;
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
}

// Event handlers returned by feature hooks
export interface MouseEffectHandlers {
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
}

export interface RippleHandlers {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Props for the Video2Ascii component.
 *
 * @example
 * ```tsx
 * const props: VideoToAsciiProps = {
 *   src: '/video.mp4',
 *   numColumns: 120,
 *   colored: true,
 *   charset: 'standard',
 *   enableMouse: true,
 * };
 * ```
 */
export interface VideoToAsciiProps {
  /** Video source URL (required) */
  src: string;

  // Size control
  /** Number of ASCII columns. Higher = more detail, lower = better performance. @default 80 */
  numColumns?: number;

  // Rendering
  /** Enable color mode (true) or monochrome (false). @default true */
  colored?: boolean;
  /** Blend factor between ASCII and original video (0-1). @default 0 */
  blend?: number;
  /** Edge highlight intensity (0-1). @default 0 */
  highlight?: number;
  /** Brightness multiplier. @default 1.0 */
  brightness?: number;
  /** ASCII character set to use. @default 'standard' */
  charset?: CharsetKey;

  // Mouse effect
  /** Enable mouse glow trail effect. @default true */
  enableMouse?: boolean;
  /** Length of mouse trail in frames. @default 24 */
  trailLength?: number;

  // Ripple effect
  /** Enable click ripple effect. @default false */
  enableRipple?: boolean;
  /** Ripple animation speed. @default 40 */
  rippleSpeed?: number;

  // Audio
  /** Audio reactivity intensity (0 = disabled, 0-1 = intensity). @default 0 */
  audioEffect?: number;
  /** Audio frequency range sensitivity. @default 50 */
  audioRange?: number;

  // Controls
  /** Control video playback state. @default true */
  isPlaying?: boolean;
  /** Auto-play video when ready. @default true */
  autoPlay?: boolean;
  /** Enable spacebar to toggle play/pause. @default false */
  enableSpacebarToggle?: boolean;

  /** Show FPS and dimension stats overlay. @default false */
  showStats?: boolean;
  /** Additional CSS class for the container. */
  className?: string;
}

// Legacy types for backwards compat
export interface VideoToAsciiWebGLProps extends VideoToAsciiProps {
  showBenchmark?: boolean;
  muted?: boolean;
}

export interface BenchmarkStats extends AsciiStats {
  gpuTime: number;
}

export interface WebGLResources {
  gl: WebGL2RenderingContext;
  program: WebGLProgram;
  videoTexture: WebGLTexture;
  atlasTexture: WebGLTexture;
}

export interface Ripple {
  x: number;
  y: number;
  startTime: number;
}
