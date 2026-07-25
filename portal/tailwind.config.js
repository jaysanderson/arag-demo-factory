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
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '10px',
        xl: '14px',
        '2xl': '18px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(28,26,22,0.05)',
        sm: '0 1px 2px rgba(28,26,22,0.06), 0 1px 1px rgba(28,26,22,0.04)',
        DEFAULT: '0 1px 3px rgba(28,26,22,0.08), 0 1px 2px rgba(28,26,22,0.05)',
        md: '0 4px 14px rgba(28,26,22,0.08)',
        lg: '0 10px 30px rgba(28,26,22,0.10)',
        glow: '0 0 0 1px var(--brand-softer), 0 8px 30px -12px var(--brand)',
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
        'bounce-dot': {
          '0%,80%,100%': { transform: 'translateY(0)', opacity: '0.4' },
          '40%': { transform: 'translateY(-3px)', opacity: '1' },
        },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-out',
        'fade-in-fast': 'fade-in-fast 0.18s ease-out',
      },
    },
  },
  plugins: [],
};
