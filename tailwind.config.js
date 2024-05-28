/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'large': '1400px'
      },
      colors: {
        'main-color': '#1a1a2e',
  'seconday-color': '#5C61F2',
      },
    },
  },
  plugins: [],
}