/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sand: { 50: '#FBF7F1', 100: '#F4EBDD', 200: '#EADBC4', 300: '#D9C29F' },
        clay: { 400: '#D9774F', 500: '#C65D3B', 600: '#A8492B', 700: '#82381F' },
        ink: { 700: '#2B3A4E', 800: '#1E2A3A', 900: '#141C27' },
        saffron: '#E3A33B',
        majorelle: '#2F4BA8',
        mint: '#3E7C6B',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(30,42,58,.06), 0 12px 32px -12px rgba(30,42,58,.25)',
      },
    },
  },
  plugins: [],
}
