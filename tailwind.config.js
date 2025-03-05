/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        header: '#E1171E',
        main: '#F7FAFC',
        searchbar: '#EB2F35',
        green1: '#2DBE64',
        green2: '#77D499',
        green5: '#57CA82',
        green6: '#36BA5F',
        grey1: '#F0F0F4',
        grey2: '#707070',
        grey3: '#94959B',
        grey5: '#BCBCC3',
        berry1: '#D7144B',
        berry2: '#EB426E',
        orange1: '#F98026',
        blue1: '#5992E8',
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
