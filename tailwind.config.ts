import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        primary: '#FDB813',
        muted: '#D1D5DB',
        surface: '#1F1F1F',
        accent: '#25D366'
      },
      boxShadow: {
        glow: '0 24px 80px rgba(253, 184, 19, 0.18)',
        soft: '0 16px 40px rgba(0, 0, 0, 0.35)'
      }
    }
  },
  plugins: []
};

export default config;
