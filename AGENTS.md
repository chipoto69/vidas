# PROJECT KNOWLEDGE BASE

**Generated:** 2025-12-28
**Commit:** 4e271bdb
**Branch:** fullporter-mvp-release

## OVERVIEW

WebGL-powered video-to-ASCII conversion system. Two-package architecture: `video2ascii` (React library) consumed by `vidas-app` (Next.js frontend).

## STRUCTURE

```
VIDAS/
├── video2ascii/     # Standalone React library (npm package)
│   └── src/
│       ├── components/  # Video2Ascii main component
│       ├── hooks/       # Core logic (useVideoToAscii, effects)
│       └── lib/         # WebGL shaders, types
├── vidas-app/       # Next.js 16 consumer app
│   └── src/
│       ├── app/         # Routes: /, /studio
│       └── lib/video2ascii/  # VENDORED lib artifacts (not workspace)
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add ASCII effect | `video2ascii/src/hooks/` | New hook + register in Video2Ascii |
| Modify shaders | `video2ascii/src/lib/webgl/shaders/` | Inline GLSL via tsup |
| Add charset | `video2ascii/src/lib/charsets.ts` | Update CharsetKey type |
| UI changes | `vidas-app/src/app/studio/` | Main app interface |
| Add route | `vidas-app/src/app/` | Next.js App Router |

## CONVENTIONS

- **Consumer-Provider Architecture**: NOT a workspace monorepo. Changes to `video2ascii` require `npm run build` then manual copy to `vidas-app/src/lib/video2ascii/`
- **Hook Orchestration**: All effects use `registerUniformSetter` pattern for decoupled WebGL uniform access
- **60fps Values**: Use `useRef` + uniforms, NEVER `useState` for animation values
- **Dynamic Import**: video2ascii loaded with `next/dynamic` + `ssr: false`

## ANTI-PATTERNS (THIS PROJECT)

- **useState for animation**: Causes re-renders at 60fps → use useRef + WebGL uniforms
- **Direct DOM outside refs**: WebGL canvas lifecycle tied to ref cleanup
- **Workspace linking**: Deps are vendored, not linked - build+copy workflow required

## COMMANDS

```bash
# video2ascii library
cd video2ascii && npm run build    # Build lib with tsup
cd video2ascii && npm run dev      # Watch mode

# vidas-app
cd vidas-app && npm run dev        # Dev server (port 3000)
cd vidas-app && npm run build      # Production build

# After lib changes
cd video2ascii && npm run build && cp -r dist ../vidas-app/src/lib/video2ascii/
```

## NOTES

- **Solana deps installed but inactive**: Wallet adapters in package.json, providers not wired up
- **React 19 + Next 16**: Bleeding edge versions
- **GLSL inline loading**: tsup configured to import .glsl as text
- **8 ASCII charsets**: standard, blocks, minimal, extended, binary, matrix, dots, arrows
