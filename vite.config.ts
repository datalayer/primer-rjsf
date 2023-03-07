import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true, // Fixes https://github.com/rjsf-team/react-jsonschema-form/issues/3228
    alias: {
      // The following is needed to allow the material ui v4 and v5 themes to properly load the css
      "@mui/styles": path.resolve("./node_modules", "@mui/styles"),
      "@material-ui/styles": path.resolve(
        "./node_modules",
        "@material-ui/styles"
      ),
      "@emotion/react": path.resolve("./node_modules/@emotion/react"),
      "@emotion/styled": path.resolve("./node_modules/@emotion/styled"),
    },
  },
})
