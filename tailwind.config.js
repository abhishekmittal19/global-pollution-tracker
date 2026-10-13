/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F2F8F5',
          100: '#E4F1EC',
          200: '#C7E2D7',
          300: '#9ECCC0',
          400: '#68B09D',
          500: '#3D927D',
          600: '#23735B',
          700: '#1A5B47',
          800: '#134636',
          900: '#0D3328',
          950: '#071F18',
        },
        sand: {
          50: '#FDFCF9',
          100: '#F9F8F3',
          200: '#F2EFE7',
          300: '#E7E2D5',
          400: '#D5CDBB',
          500: '#B8AD94',
        },
        slate: {
          850: '#172033',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 2px 8px -2px rgba(0, 0, 0, 0.03)',
        'elevation': '0 4px 12px -2px rgba(13, 51, 40, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
