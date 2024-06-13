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
    },
  },
  plugins: [],
}
