
# Cinematic Birthday Experience — Build Plan

A dark romantic, cinematic single-experience site built as TanStack Start routes with React + Tailwind + Framer Motion. All copy, photos, and audio live in one editable config so you can swap content without touching components.

## Visual & Tech Foundation

- Theme: deep black → wine gradient base, soft pink/red ambient glow, film grain overlay, glassmorphism cards.
- Typography: serif display (Cormorant Garamond) for emotional headlines, handwriting (Caveat) for letter, sans (Inter) for UI.
- Motion: Framer Motion for transitions, scroll reveals, card flips, lantern drift; Lenis for smooth scroll.
- Ambient layers (global): particles canvas, light bloom gradients, subtle grain SVG, cursor glow.
- Music: single audio manager (React context) with mute toggle pinned top-right; tracks crossfade between chapters.
- Responsive, lazy-loaded images, semantic head() metadata per route, reduced-motion fallback.

## Editable Content Layer

One folder, plain TS objects — no DB:

```text
src/content/
  config.ts          // her name, dates, signature
  letter.ts          // letter body + voice note path
  timeline.ts        // memories array
  gallery.ts         // photos + captions
  reasons.ts         // why-i-love-you cards
  voiceNotes.ts      // audio entries
  quiz.ts            // questions + answers
  dreams.ts          // future bucket list
  openWhen.ts        // envelope letters
src/assets/audio/    // music + voice notes (placeholders)
src/assets/images/   // photos (AI-generated placeholders)
```

Every component reads from these files. Comments at the top of each file explain how to edit.

## Page Architecture

Single emotional journey with chapter unlocking gated by the cake.

```text
src/routes/
  __root.tsx                 // shell + AudioProvider + Particles + Grain
  index.tsx                  // Loader → Hero (Sections 1–2)
  journey.tsx                // Sections 3–12 stitched as scroll chapters
```

Loader → Hero on `/`. "Click to Enter" navigates to `/journey` with a fade-to-black transition and music swap. Sections 7–12 stay locked behind a soft blur until cake is cut (state persisted in localStorage).

## Component Map

```text
src/components/
  ambient/        Particles, Grain, Bloom, CursorGlow
  audio/          AudioProvider, MuteToggle, WaveformPlayer
  ui/             GlassCard, ChapterHeading, RevealOnScroll
  loader/         CinematicLoader (typing quote + % count)
  hero/           Hero, EnterButton, NameReveal
  letter/         LetterCard (typing + handwriting)
  cake/           Cake (CSS/SVG 3D-ish), Candle, Knife, Confetti, CakeChapter
  timeline/       Timeline, MemoryCard
  gallery/        PolaroidMasonry, Lightbox
  reasons/        ReasonsDeck, FlipCard
  voice/          VoiceNotesList
  game/           LoveQuiz
  dreams/         DreamsCosmos, BoardingPass
  openwhen/       EnvelopeGrid, Envelope
  ending/         FinaleSky, Lanterns, ReplayButton
```

## Section-by-Section Behavior

1. **Loader** — full-screen black, blurred backdrop, animated quote types out, % counter 0→100, fades up into hero.
2. **Hero** — name "My Love" reveals letter-by-letter, serif subtitle, glowing "Click to Enter" with hover bloom, particles + soft red vignette, music starts muted by default with toggle.
3. **Letter** — handwriting font types in over glass card, signature + date from config, optional `<audio>` voice note play button.
4. **Cake** — SVG cake on a glass pedestal, flickering candle (SVG + keyframes), "Blow / Tap candle" button extinguishes flame with smoke puff, "Cut the Cake" triggers knife slice + confetti burst + music swell, hidden message reveals, journey unlocks.
5. **Timeline** — vertical glowing spine; memory cards alternate sides, reveal on scroll, each has image/date/caption and a tiny hover micro-animation.
6. **Gallery** — polaroid masonry with slight tilt, hover zoom, click → lightbox with caption + date.
7. **Reasons** — floating deck of glass cards drifting gently; click flips card to reveal reason.
8. **Voice Notes** — categorized cards, custom player with animated bar waveform, glow pulse while playing, transcript expandable.
9. **Love Quiz** — one question at a time, animated transitions, score tally, perfect score unlocks a hidden polaroid.
10. **Future Dreams** — cosmos backdrop, aurora gradients, floating star cards for bucket list, a faux boarding pass component.
11. **Open When** — grid of wax-sealed envelopes, click → envelope opens (flap rotateX), letter slides up, music softens.
12. **Finale** — night sky, drifting lanterns rising, final message fades in line-by-line, "Replay Our Story" returns to loader.

## Cross-cutting

- **Audio Manager**: chapters register desired track; provider crossfades. Single mute toggle controls everything. No autoplay sound — first user gesture (Enter button) starts music.
- **Locking**: `useUnlock()` hook reads/writes `cakeCut` flag; locked sections render a blurred preview with "🔒 Cut the cake to unlock".
- **Performance**: route-level code splitting between `/` and `/journey`, `loading="lazy"` images, particles capped + paused off-screen, `prefers-reduced-motion` disables drift/parallax.
- **SEO/Head**: per-route head() with intimate but generic titles ("A Letter For You").
- **Accessibility**: all interactive elements keyboard reachable, aria labels on audio + envelopes, captions visible (not hover-only).

## Technical Notes

- Add deps: `framer-motion`, `lenis`, `clsx` (likely present), Google Fonts via `<link>` in __root head.
- Cake is pure SVG + CSS/Framer — no Three.js (stays light, works on Worker SSR).
- Confetti via lightweight `canvas-confetti`.
- Placeholder images generated with the image tool (warm cinematic stills, soft bokeh) saved to `src/assets/images/`. Placeholder MP3s referenced but you'll drop your own files into `src/assets/audio/` (paths pre-wired).

## Out of Scope (intentionally)

- No backend, accounts, or DB — content is local config.
- No real 3D engine for the cake (kept SVG for performance + reliability).
- Mic-based candle blowing skipped per your choice; tap/click only.

After implementation you'll be able to: edit `src/content/*.ts` to personalize every word, drop your photos into `src/assets/images/`, drop your songs into `src/assets/audio/`, and publish.
