/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}" 
  ],
  theme: {
    extend: {
      boxShadow: {
        white: '0 4px 6px rgba(250, 250, 250, 0.8), 1px 1px 3px rgba(250, 250, 250, 0.6)',
      }
    }, 
  },
  plugins: [
    require('tailwindcss'), 
    require('autoprefixer'), 
  ],
}
