import * as react_jsx_runtime from 'react/jsx-runtime';

/**
 * ASCII Character Set Definitions
 *
 * Character sets are ordered from dark (low brightness) to light (high brightness).
 * The shader maps pixel brightness to character index, so the first character
 * represents the darkest pixels and the last represents the brightest.
 *
 * To add a new character set:
 * 1. Add an entry to ASCII_CHARSETS with a unique key
 * 2. Order characters from dark → light (spaces/dots first, dense chars last)
 * 3. The key becomes available in CharsetKey type automatically
 */
declare const ASCII_CHARSETS: {
    /** Classic 10-character gradient - good balance of detail and performance */
    readonly standard: {
        readonly name: "Standard";
        readonly chars: " .:-=+*#%@";
    };
    /** Unicode block characters - chunky retro aesthetic */
    readonly blocks: {
        readonly name: "Blocks";
        readonly chars: " ░▒▓█";
    };
    /** Minimal 5-character set - high contrast, fast rendering */
    readonly minimal: {
        readonly name: "Minimal";
        readonly chars: " .oO@";
    };
    /** Binary on/off - pure silhouette mode */
    readonly binary: {
        readonly name: "Binary";
        readonly chars: " █";
    };
    /** 70-character gradient - maximum detail, best for high resolution */
    readonly detailed: {
        readonly name: "Detailed";
        readonly chars: " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
    };
    /** Dot-based - pointillist aesthetic */
    readonly dots: {
        readonly name: "Dots";
        readonly chars: " ·•●";
    };
    /** Directional arrows - experimental */
    readonly arrows: {
        readonly name: "Arrows";
        readonly chars: " ←↙↓↘→↗↑↖";
    };
    /** Moon phases - decorative gradient */
    readonly emoji: {
        readonly name: "Emoji";
        readonly chars: "  ░▒▓🌑🌒🌓🌔🌕";
    };
};
/** Type-safe key for selecting character sets */
type CharsetKey = keyof typeof ASCII_CHARSETS;
/** Default character set used when none is specified */
declare const DEFAULT_CHARSET: CharsetKey;
/**
 * Get the character array for a given charset key.
 * Uses spread operator to correctly handle multi-byte unicode characters.
 */
declare function getCharArray(charset: CharsetKey): string[];
/**
 * Get the display name for a charset
 */
declare function getCharsetName(charset: CharsetKey): string;

/**
 * @module webgl/types
 * @description Type definitions for the video2ascii WebGL rendering system.
 */

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
interface VideoToAsciiProps {
    /** Video source URL (required) */
    src: string;
    /** Number of ASCII columns. Higher = more detail, lower = better performance. @default 80 */
    numColumns?: number;
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
    /** Enable mouse glow trail effect. @default true */
    enableMouse?: boolean;
    /** Length of mouse trail in frames. @default 24 */
    trailLength?: number;
    /** Enable click ripple effect. @default false */
    enableRipple?: boolean;
    /** Ripple animation speed. @default 40 */
    rippleSpeed?: number;
    /** Audio reactivity intensity (0 = disabled, 0-1 = intensity). @default 0 */
    audioEffect?: number;
    /** Audio frequency range sensitivity. @default 50 */
    audioRange?: number;
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

/**
 * Video2Ascii - Real-time video to ASCII art converter using WebGL2.
 *
 * @description
 * Renders video content as ASCII characters using GPU-accelerated WebGL2 shaders.
 * Supports multiple character sets, color modes, and interactive effects including
 * mouse trails, click ripples, and audio reactivity.
 *
 * @param props - Configuration options for rendering and effects
 * @returns A React component rendering the ASCII visualization
 *
 * @example Basic usage
 * ```tsx
 * <Video2Ascii
 *   src="/my-video.mp4"
 *   numColumns={100}
 *   colored={true}
 * />
 * ```
 *
 * @example With all effects enabled
 * ```tsx
 * <Video2Ascii
 *   src={videoUrl}
 *   numColumns={120}
 *   colored={true}
 *   blend={0.3}
 *   brightness={1.2}
 *   charset="blocks"
 *   enableMouse={true}
 *   trailLength={32}
 *   enableRipple={true}
 *   rippleSpeed={50}
 *   audioEffect={0.7}
 *   audioRange={60}
 *   showStats={true}
 * />
 * ```
 *
 * @remarks
 * - Requires WebGL2 support in the browser
 * - Video element is hidden; only the canvas is displayed
 * - For best performance, use power-of-2 numColumns values
 * - Audio effects require user interaction to start (browser autoplay policy)
 *
 * @see {@link https://github.com/chipoto69/vidas} for documentation
 */
declare function Video2Ascii({ src, numColumns, colored, blend, highlight, brightness, charset, enableMouse, trailLength, enableRipple, rippleSpeed, audioEffect, audioRange, isPlaying, autoPlay, enableSpacebarToggle, showStats, className, }: VideoToAsciiProps): react_jsx_runtime.JSX.Element;

export { ASCII_CHARSETS, type CharsetKey, DEFAULT_CHARSET, Video2Ascii, type VideoToAsciiProps, Video2Ascii as default, getCharArray, getCharsetName };
