/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        softlime: {
          DEFAULT: '#D9EFAB',
          hover: '#c8e492',
          light: '#f5faeb',
          dark: '#9bbd5c',
          border: 'rgba(180, 215, 110, 0.45)',
          text: '#22380a',
        },
        owid: {
          navy: '#0c2340',
          darkNavy: '#051426',
          headerNavy: '#002147',
          blue: '#185a9d',
          lightBlue: '#eef6fc',
          accentBlue: '#0d6efd',
          paper: '#ffffff',
          bg: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
          borderStrong: '#cbd5e1',
          charcoal: '#1e293b',
          slate: '#334155',
          muted: '#64748b',
          lightMuted: '#94a3b8',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Lora', 'Georgia', 'serif'],
        sans: ['Lato', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'owid-card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'owid-hover': '0 4px 12px 0 rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'softlime-badge': '0 1px 3px 0 rgba(217, 239, 171, 0.4)',
      }
    },
  },
  plugins: [],
}
