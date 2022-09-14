/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        knockoutGray: {
          DEFAULT: '#2D2D30',
          '50': '#B1B1B6',
          '100': '#A6A6AC',
          '200': '#919198',
          '300': '#7C7C84',
          '400': '#68686F',
          '500': '#54545A',
          '600': '#414145',
          '700': '#2D2D30',
          '800': '#1E1E20',
          '900': '#0F0F10'
        }
      }
    },
  },
  plugins: [],
}
