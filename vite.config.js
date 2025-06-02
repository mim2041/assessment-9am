import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    cors: {
      origin: /^http:\/\/[a-z0-9-]*\.?localhost:5173$ ^http:\/\/[a-z0-9-]*\.?localhost:5173$/,
      credentials: true
    }
  }
})
