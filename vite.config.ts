import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // tutorial
  server: {
    open: true,
    port: 3000,
  },

  // shacdn ui
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})