# Demo Recording Guide

How to record a professional, reproducible walkthrough of a finished ARAG demo portal using
the Playwright MCP (headless Chromium with video), driven by a scripted **BEATS timeline**.

## Prerequisites

1. **A built demo** — the portal running locally (`cd portal && npm run dev`, server on 4000)
   or deployed at `<slug>.fly.dev`.
2. **Corpus ingested and verified** — cornerstone queries answer + cite, refusal probes
   refuse (Phase 5 green). Record only a demo that passes verification.
3. **Playwright MCP** — ships with the factory (`playwright` server in the MCP config). For a
   standalone script:
   ```bash
   npm install playwright
   npx playwright install chromium
   ```
4. **ffmpeg** (WebM → MP4):
   ```bash
   brew install ffmpeg        # macOS
   sudo apt install ffmpeg    # Ubuntu/Debian
   ```

**Output:** 1920x1080 WebM, converted to MP4. Silent video — narration is delivered as an
SRT sidecar (deterministic, editable, localizable), not recorded voiceover.

## The BEATS Timeline

Each beat is a scripted section: a `name` (for re-recording), a `duration` (ms), and an
`actions` array of Playwright operations. Drive the ARAG surfaces the blueprint's
`demoScript` calls out.

```js
const BEATS = [
  {
    name: 'landing',
    duration: 8000,
    description: 'Portal landing — themed brand, disclaimer visible',
    actions: [
      { type: 'navigate', url: '/' },
      { type: 'wait', ms: 2500 },
    ],
  },
  {
    name: 'ask',
    duration: 14000,
    description: 'Ask a cornerstone question — grounded, cited answer streams in',
    actions: [
      { type: 'navigate', url: '/ask' },
      { type: 'type', selector: 'input[type="text"]', text: 'our standard spendthrift trust clause', delay: 70 },
      { type: 'click', selector: 'button[type="submit"]' },
      { type: 'wait', ms: 6000 },        // let the NDJSON answer + citations render
    ],
  },
  {
    name: 'refuse',
    duration: 10000,
    description: 'Out-of-scope question — the portal refuses, no confabulation',
    actions: [
      { type: 'type', selector: 'input[type="text"]', text: 'current SEC insider-trading penalties', delay: 70 },
      { type: 'click', selector: 'button[type="submit"]' },
      { type: 'wait', ms: 5000 },
    ],
  },
];
```

### Action types

| Type | Parameters | Description |
|------|-----------|-------------|
| `navigate` | `url` | Go to a route (relative to the portal) |
| `click` | `selector` | Click an element |
| `type` | `selector`, `text`, `delay` | Type with keystroke delay (ms) |
| `wait` | `ms` | Pause |
| `waitForSelector` | `selector`, `timeout` | Wait for an element |
| `screenshot` | `name`, `fullPage` | Capture a still |

## Recording via the Playwright MCP

Ask the orchestrator (or `@tester`) to drive the `playwright` MCP through the BEATS above:
navigate the portal, exercise each enabled surface, and capture video/screenshots. Because
the MCP is headless, inject a cursor overlay if you want a visible pointer in the recording.

## Convert & narrate

```bash
# WebM -> MP4
ffmpeg -i recordings/demo.webm -c:v libx264 -crf 20 recordings/demo.mp4

# Soft subtitles (viewer can toggle)
ffmpeg -i recordings/demo.mp4 -i narration.srt -c copy -c:s mov_text recordings/demo-final.mp4
```

## Timing Guidelines

1. **Pause 2-3s after navigation** — let the viewer's eye settle.
2. **Typing delay 50-100ms** — readable, not sluggish.
3. **Let a streamed `/ask` answer finish** — wait ~6s so the answer AND its citations render
   before moving on. The citations are the point; don't cut them off.
4. **Show the refusal** — hold on the "no grounded answer" state for a few seconds. Clean
   refusal is a selling moment, not a bug.
5. **Graph/facets: pause ~5s** — visual surfaces take longer to absorb.

## What to Show (per the blueprint)

Follow the blueprint's `demoScript` beats — they're written to land the story. At minimum:
a themed landing, one cornerstone `/ask` with visible citations, the differentiator surface
(graph / facets / call-QA / personas), and one refusal probe. Keep the synthetic-data
disclaimer in frame at least once.

## Hard Rules on Camera

- The wordmark/brand on screen is **fictional** — never a real customer's brand.
- The **disclaimer** is visible in the recording.
- **No zone/region string** appears anywhere in the UI.
- Never record the KB token or any secret (it's server-side and never rendered anyway).

## File Organization

```
recordings/            # gitignored — video output
  demo.webm            # raw Playwright recording
  demo.mp4             # converted
  demo-final.mp4       # with narration muxed in
narration.srt          # your narration script (per demo)
```

`recordings/` is gitignored — video files don't belong in version control.
