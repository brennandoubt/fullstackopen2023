import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // add frontend target to send requests to correct backend address 
  server: {
    // React dev environment now works as a proxy
    proxy: {
      // redirect requests to '/api...' paths to the server
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },
  // ^ frontend now works with server both in development and production mode
})
