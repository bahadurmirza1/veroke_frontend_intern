/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      'max-md': { 'max': '767px' },
      'max-mb': { 'max': '376px' },
    },
  },
  plugins: [],
}

