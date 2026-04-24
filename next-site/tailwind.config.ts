import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2563eb',
          'blue-deep': '#1d4ed8',
          amber: '#f59e0b',
          ink: '#252525',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #2563eb 0%, #f59e0b 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(245,158,11,0.06))',
      },
      boxShadow: {
        'premium': '0 20px 60px -20px rgba(37, 99, 235, 0.25)',
        'premium-amber': '0 20px 60px -20px rgba(245, 158, 11, 0.28)',
        'soft': '0 10px 40px -12px rgba(30, 58, 138, 0.08)',
        'glow-blue': '0 0 40px -5px rgba(37, 99, 235, 0.35)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 5s ease-in-out infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        scroll: 'scroll 60s linear infinite',
        shimmer: 'shimmer 6s linear infinite',
        'hero-pattern-drift': 'heroPatternDrift 24s linear infinite',
        'active-pulse': 'activePulse 3s ease-in-out infinite',
        'status-dot-pulse': 'statusDotPulse 2s ease-in-out infinite',
        'aurora': 'aurora 20s ease infinite',
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
        'float-reverse': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(20px)' } },
        scroll: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(calc(-350px * 11))' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        heroPatternDrift: { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '40px 40px' } },
        activePulse: {
          '0%, 100%': { boxShadow: '0 20px 50px -12px rgba(37, 99, 235, 0.25)' },
          '50%': { boxShadow: '0 20px 50px -6px rgba(37, 99, 235, 0.4)' },
        },
        statusDotPulse: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 0 0 rgba(22, 163, 74, 0.5)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 0 6px rgba(22, 163, 74, 0)' },
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      maxWidth: {
        'ghl-row': '1100px',
        'ghl-row-faq': '800px',
      },
    },
  },
  plugins: [],
};

export default config;
