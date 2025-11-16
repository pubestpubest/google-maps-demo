import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: Number(process.env.VITE_PORT) || 5173,
    host: true,
  },
  preview: {
    port: Number(process.env.VITE_PREVIEW_PORT) || 4173,
    host: true,
  },
})
