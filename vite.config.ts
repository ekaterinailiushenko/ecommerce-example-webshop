import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import react from '@vitejs/plugin-react'

import { BASENAME_URL } from './src/helpers/constants'

// https://vitejs.dev/config/
export default defineConfig({
  base: BASENAME_URL,
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
