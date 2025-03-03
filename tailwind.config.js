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
        green6: '#36BA5F',
        grey1: '#f0f0f4',
        grey2: '#707070',
        grey3: '#94959B',
        berry1: '#D7144B',
        berry2: '#EB426E',
        orange1: '#F98026',
        blue1: '#5992e8',
      },
      minHeight: {
        68: '17rem',
      },
      fontSize: {
        xxs: '0.7rem',
      },
      animation: {
        'spin-slow': 'spin 5s linear infinite',
        'spin-fast': 'spin 0.7s linear infinite',
      },
    },
  },
  plugins: [],
}
