/** @type {import('tailwindcss').Config} */
export default {
  // Dark mode is driven by a `dark` class on <html>, toggled from the shell.
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // Brand + accent are NOT baked in — theme.ts writes them as CSS
        // variables from demo.config.json's theme tokens, so one shell themes
        // every demo. Opacity modifiers are intentionally not used on these.
        brand: {
          DEFAULT: 'var(--brand)',
          strong: 'var(--brand-strong)',
          soft: 'var(--brand-soft)',
          softer: 'var(--brand-softer)',
          contrast: 'var(--brand-contrast)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          strong: 'var(--accent-strong)',
          soft: 'var(--accent-soft)',
        },
        // Warm neutral ("paper / stone") ramp — deliberately not cold blue-gray.
        ink: {
          50: '#FAF9F7',
          100: '#F3F1EC',
          200: '#E7E3DB',
          300: '#D4CEC3',
          400: '#A39C8F',
          500: '#6F6A60',
          600: '#524E46',
          700: '#3C3933',
          800: '#2A2823',
          900: '#1C1A16',
          950: '#141210',
        },
      },
      fontSize: {
        // A tighter, more editorial display scale for hero + section headings.
        'display-xl': ['clamp(2.75rem, 6vw, 4.75rem)', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '600' }],
        'display': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'eyebrow': ['0.72rem', { lineHeight: '1', letterSpacing: '0.18em', fontWeight: '600' }],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '10px',
        xl: '14px',
        '2xl': '18px',
        '3xl': '24px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(28,26,22,0.05)',
        sm: '0 1px 2px rgba(28,26,22,0.06), 0 1px 1px rgba(28,26,22,0.04)',
        DEFAULT: '0 1px 3px rgba(28,26,22,0.08), 0 1px 2px rgba(28,26,22,0.05)',
        md: '0 4px 14px rgba(28,26,22,0.08)',
        lg: '0 10px 30px rgba(28,26,22,0.10)',
        xl: '0 24px 60px -20px rgba(28,26,22,0.22)',
        glow: '0 0 0 1px var(--brand-softer), 0 8px 30px -12px var(--brand)',
        'glow-lg': '0 0 0 1px color-mix(in srgb, var(--brand) 22%, transparent), 0 30px 80px -30px color-mix(in srgb, var(--brand) 55%, transparent)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-fast': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'bounce-dot': {
          '0%,80%,100%': { transform: 'translateY(0)', opacity: '0.4' },
          '40%': { transform: 'translateY(-3px)', opacity: '1' },
        },
        'pulse-glow': {
          '0%,100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        'drift': {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(0,-3%,0) scale(1.06)' },
        },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-out',
        'fade-in-fast': 'fade-in-fast 0.18s ease-out',
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'scale-in': 'scale-in 0.3s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'drift': 'drift 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
