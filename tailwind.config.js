/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050508',
        midnight: '#0a0a14',
        indigo: '#6C63FF',
        cyan: '#00D4FF',
        pearl: '#FAFAFA',
        muted: '#8892A4',
        glass: 'rgba(255,255,255,0.06)',
      },
      fontFamily: {
        display: ['Syne', 'Trebuchet MS', 'Verdana', 'sans-serif'],
        body: ['DM Sans', 'Trebuchet MS', 'Verdana', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 34px rgba(108, 99, 255, 0.32)',
        cyan: '0 0 26px rgba(0, 212, 255, 0.26)',
        glass: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 80px rgba(0,0,0,0.32)',
      },
      backgroundImage: {
        'spatial-gradient':
          'radial-gradient(circle at 18% 22%, rgba(108, 99, 255, 0.18), transparent 28%), radial-gradient(circle at 82% 18%, rgba(0, 212, 255, 0.12), transparent 24%), radial-gradient(circle at 55% 78%, rgba(255,255,255,0.07), transparent 22%), linear-gradient(135deg, #050508 0%, #0a0a14 48%, #050508 100%)',
        'glass-border':
          'linear-gradient(135deg, rgba(108,99,255,0.85), rgba(0,212,255,0.7), rgba(255,255,255,0.14))',
      },
      keyframes: {
        mesh: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(-2%, 1.5%, 0) scale(1.04)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 18px rgba(108,99,255,0.2)' },
          '50%': { boxShadow: '0 0 32px rgba(0,212,255,0.34)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        draw: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        mesh: 'mesh 16s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3.6s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        draw: 'draw 0.8s ease forwards',
      },
    },
  },
  plugins: [],
}
