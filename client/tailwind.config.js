/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      keyframes: {
        animateWave: {
          '0%': { 'background-position-x': '1000px' },
          '100%': { 'background-position-x': '0px' }
        },
        animateWave02: {
          '0%': { 'background-position-x': '0px' },
          '100%': { 'background-position-x': '1000px' }
        }
      }

    }
  },
  plugins: []
}
