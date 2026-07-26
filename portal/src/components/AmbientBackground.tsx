import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../lib/motion';

/**
 * The persistent atmosphere behind every page. Fixed + pointer-events-none, it
 * layers (back → front): a theme-tinted gradient mesh, two slowly drifting glow
 * orbs, an optional dark-mode starfield on canvas, fine film grain, and a soft
 * vignette. Everything derives from the theme vars (--brand / --accent), so it
 * recolours per demo and reads as cinematic depth in dark and a clean tint in
 * light. All motion is paused for reduced-motion and when the tab is hidden.
 */
export function AmbientBackground({ dark }: { dark: boolean }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Gradient mesh — brand + accent blooms that breathe. */}
      <div className="absolute inset-0">
        <div
          className={`absolute -left-[15%] -top-[20%] h-[70vh] w-[70vh] rounded-full blur-[110px] ${
            reduced ? '' : 'animate-aurora'
          }`}
          style={{
            background: `radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--brand) ${
              dark ? '42%' : '20%'
            }, transparent), transparent 68%)`,
          }}
        />
        <div
          className={`absolute -right-[12%] top-[-10%] h-[60vh] w-[60vh] rounded-full blur-[120px] ${
            reduced ? '' : 'animate-aurora'
          }`}
          style={{
            animationDelay: '-11s',
            background: `radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--accent) ${
              dark ? '30%' : '16%'
            }, transparent), transparent 66%)`,
          }}
        />
        <div
          className={`absolute bottom-[-25%] left-[30%] h-[55vh] w-[55vh] rounded-full blur-[130px] ${
            reduced ? '' : 'animate-drift-b'
          }`}
          style={{
            background: `radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--brand) ${
              dark ? '26%' : '12%'
            }, transparent), transparent 70%)`,
          }}
        />
      </div>

      {dark && <Starfield reduced={reduced} />}

      {/* Texture + framing. */}
      <div className="ambient-grain absolute inset-0" />
      <div className="ambient-vignette absolute inset-0" />
    </div>
  );
}

/**
 * A tiny, low-opacity starfield for dark mode. Stars drift upward very slowly
 * and twinkle gently. rAF pauses when the tab is hidden or reduced-motion is
 * on (in which case it paints a single static frame). Redraws on resize.
 */
function Starfield({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    type Star = { x: number; y: number; r: number; a: number; tw: number; drift: number };
    let stars: Star[] = [];

    const brand = getComputedStyle(document.documentElement).getPropertyValue('--brand').trim() || '#22d3ee';

    const seed = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Density scales with area but stays modest for performance.
      const count = Math.min(160, Math.round((width * height) / 12000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.3,
        a: Math.random() * 0.5 + 0.2,
        tw: Math.random() * Math.PI * 2,
        drift: Math.random() * 0.06 + 0.02,
      }));
    };

    const paint = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        const twinkle = reduced ? 1 : 0.6 + 0.4 * Math.sin(t * 0.001 + s.tw);
        ctx.globalAlpha = s.a * twinkle;
        // Most stars are cool white; a few pick up the brand tint for depth.
        ctx.fillStyle = s.r > 1 ? brand : '#dbeafe';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      for (const s of stars) {
        s.y -= s.drift * (dt / 16);
        if (s.y < -2) {
          s.y = height + 2;
          s.x = Math.random() * width;
        }
      }
      paint(now);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      if (reduced) {
        paint(0);
        return;
      }
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else start();
    };
    const onResize = () => {
      seed();
      if (reduced) paint(0);
    };

    seed();
    start();
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />;
}
