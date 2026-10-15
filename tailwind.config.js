/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // one neutral family + one accent (Majorelle cobalt), two lightnesses keyed to the ground
        paper: { DEFAULT: '#F3F1EC', deep: '#E8E4DC' },
        ink: { DEFAULT: '#17191E', soft: '#4A4E57', mute: '#6B6F78' },
        night: { DEFAULT: '#121419', soft: '#B8BBC4', line: '#2A2D35' },
        cobalt: { DEFAULT: '#2140A6', deep: '#18307F', light: '#A9B8FF' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      maxWidth: { page: '1320px' },
      transitionTimingFunction: { out: 'cubic-bezier(0.23, 1, 0.32, 1)' },
    },
  },
  plugins: [],
}
