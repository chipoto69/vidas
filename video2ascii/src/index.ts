/**
 * @packageDocumentation
 * video2ascii - WebGL-powered video to ASCII art converter for React
 *
 * @remarks
 * This library provides real-time video-to-ASCII conversion using WebGL2 shaders.
 * It supports multiple character sets, interactive mouse effects, ripple animations,
 * and audio-reactive rendering at 60fps.
 *
 * @example Basic usage
 * ```tsx
 * import { Video2Ascii } from 'video2ascii';
 *
 * function App() {
 *   return (
 *     <Video2Ascii
 *       src="/video.mp4"
 *       numColumns={120}
 *       colored={true}
 *       charset="standard"
 *     />
 *   );
 * }
 * ```
 *
 * @example With effects
 * ```tsx
 * <Video2Ascii
 *   src="/video.mp4"
 *   enableMouse={true}
 *   trailLength={24}
 *   enableRipple={true}
 *   audioEffect={0.5}
 * />
 * ```
 */

/**
 * Main Video2Ascii React component for rendering video as ASCII art.
 * Uses WebGL2 for hardware-accelerated rendering at 60fps.
 *
 * @see {@link VideoToAsciiProps} for available props
 */
export { Video2Ascii } from "./components/VideoToAscii";

/**
 * Default export of the Video2Ascii component.
 * @see {@link Video2Ascii}
 */
export { default } from "./components/VideoToAscii";

/**
 * Props interface for the Video2Ascii component.
 * Includes options for rendering, effects, and playback control.
 */
export type { VideoToAsciiProps } from "./lib/webgl/types";

/**
 * Available ASCII character sets for rendering.
 * Each charset provides different visual aesthetics.
 *
 * @example
 * ```ts
 * import { ASCII_CHARSETS } from 'video2ascii';
 *
 * // Get available charset keys
 * const charsets = Object.keys(ASCII_CHARSETS);
 * // ['standard', 'blocks', 'minimal', 'binary', 'detailed', 'dots', 'arrows', 'emoji']
 * ```
 */
export { ASCII_CHARSETS } from "./lib/ascii-charsets";

/**
 * Type-safe union of available charset keys.
 *
 * @example
 * ```ts
 * import type { CharsetKey } from 'video2ascii';
 *
 * const charset: CharsetKey = 'matrix'; // Type error - not a valid charset
 * const charset: CharsetKey = 'standard'; // OK
 * ```
 */
export type { CharsetKey } from "./lib/ascii-charsets";

/**
 * Utility functions for working with charsets.
 */
export { getCharArray, getCharsetName, DEFAULT_CHARSET } from "./lib/ascii-charsets";
