/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        header: '#e1171e',
        main: '#f7fafc',
        searchbar: '#eb2f35',
        green1: '#2DBE64',
        green2: '#77D499',
        grey1: '#f0f0f4',
        berry1: '#D7144B',
        berry2: '#EB426E',
      },
      minHeight: {
        68: '17rem',
      },
      fontSize: {
        xxs: '0.7rem',
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite',
      },
    },
  },
  plugins: [],
}
