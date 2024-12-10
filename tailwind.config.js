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
        'main-color': '#0f172a',
        'secondary-color': '#6366F1'
      },
      gridTemplateRows: {
        layout: 'auto 1fr', 
      },
      gridTemplateColumns: {
        layout: '250px 1fr', 
      },
    },
  },
  plugins: [],
}