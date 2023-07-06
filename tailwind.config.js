/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx'],
  theme: {
    fontFamily: {
      display: ['Inter', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
}
