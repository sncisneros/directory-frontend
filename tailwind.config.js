/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        neutralLight: '#e6d9c6',
        neutralDark: '#3a4660',
        accent: '#acb7ae',
        open: '#22c55e',
        closed: '#ef4444',
      },
      fontFamily: {
        elegant: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

