/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        header: '#e1171e',
        main: '#f7fafc',
        searchbar: '#eb2f35',
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
