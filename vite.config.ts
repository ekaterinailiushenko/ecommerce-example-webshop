/* eslint-disable spaced-comment */
/// <reference types="vitest" />
/* eslint-enable spaced-comment */

import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'
import react from '@vitejs/plugin-react'

import { Routes } from './src/router/config'

// https://vitejs.dev/config/
export default defineConfig({
  base: Routes.HOME_PAGE_URL,
  plugins: [react()],
  test: { environment: 'jsdom', globals: true, setupFiles: './tests/setup.ts' },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  esbuild: {
    supported: {
      'top-level-await': true, // browsers can handle top-level-await features
    },
  },
})
