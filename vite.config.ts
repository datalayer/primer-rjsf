import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react()
  ],
  resolve: {
    preserveSymlinks: true, // Fixes https://github.com/rjsf-team/react-jsonschema-form/issues/3228
    alias: {},
  },
})
