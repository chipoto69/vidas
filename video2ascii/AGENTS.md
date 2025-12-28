# video2ascii Library

Standalone React component for WebGL2 real-time video→ASCII conversion.

## STRUCTURE

```
src/
├── components/
│   └── VideoToAscii.tsx   # Main component, composes all hooks
├── hooks/
│   ├── useVideoToAscii.ts # Core brain: RAF loop, WebGL init, uniform registry
│   ├── useAsciiMouseEffect.ts  # Mouse trail effect
│   ├── useAsciiRipple.ts       # Click ripple effect
│   └── useAsciiAudio.ts        # Web Audio reactive effect
├── lib/
│   ├── webgl/shaders/     # GLSL fragment/vertex shaders
│   ├── charsets.ts        # 8 charset definitions + CharsetKey type
│   └── types.ts           # VideoToAsciiProps, hook types
└── index.ts               # Public exports
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add new effect | `hooks/useAscii*.ts` | Follow useAsciiRipple pattern |
| Modify ASCII algorithm | `lib/webgl/shaders/` | Fragment shader |
| Add prop to component | `components/VideoToAscii.tsx` + `lib/types.ts` |
| New charset | `lib/charsets.ts` | Add to ASCII_CHARSETS + CharsetKey |

## CONVENTIONS

- **registerUniformSetter pattern**: Hooks call `registerUniformSetter(name, setter)` to inject uniforms into RAF loop without coupling
- **Brightness compression**: `pow(brightness, 0.7)` formula for ASCII legibility
- **Ref-based state**: Animation values in useRef, not useState (perf critical)
- **Hook composition**: Video2Ascii composes hooks, doesn't contain logic itself

## ANTI-PATTERNS

- **useState for per-frame values**: Causes 60 re-renders/sec
- **Direct WebGL calls outside hooks**: Use uniform registry pattern
- **Hardcoded shader values**: Pass via uniforms for runtime control

## EXPORTS

```typescript
// Main component
export { Video2Ascii } from './components/VideoToAscii'
export default Video2Ascii

// Types
export type { VideoToAsciiProps } from './lib/types'
export type { CharsetKey } from './lib/charsets'

// Charsets
export { ASCII_CHARSETS } from './lib/charsets'
```

## BUILD

```bash
npm run build   # tsup → dist/{index.js, index.mjs, index.d.ts}
npm run dev     # Watch mode
```

tsup config loads .glsl files as text strings for inline shader compilation.
