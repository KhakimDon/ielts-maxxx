/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        atyp: ['var(--font-atyp)'],
      },
      colors: {
        'brand-yellow': '#fca311',
      },
    },
  },
  plugins: [],
}