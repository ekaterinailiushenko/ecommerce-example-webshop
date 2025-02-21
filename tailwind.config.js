/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        outline: '#E0E0E0',
        green1: '#2DBE64',
        green2: '#77D499',
        green3: '#20A151',
        green4: '#179C49',
        green5: '#57CA82',
        green6: '#36BA5F',
        green7: '#E9F8EE',
        grey1: '#F0F0F4',
        grey2: '#707070',
        grey3: '#94959B',
        grey4: '#C2C2C2',
        grey5: '#BCBCC3',
        grey6: '#F5F5F5',
        grey7: '#F8F8FA',
        berry1: '#D7144B',
        berry2: '#EB426E',
        orange1: '#F98026',
        orange2: '#F06D24',
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
