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
        // 'secondary-color': '#5C61F2',
        'secondary-color': '#6366F1'
      },
      gridTemplateRows: {
        layout: 'auto 1fr auto', 
      },
      gridTemplateColumns: {
        layout: '250px 1fr', 
      },
    },
  },
  plugins: [],
}