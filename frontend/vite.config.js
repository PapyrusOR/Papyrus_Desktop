import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// TS + React 19 + Arco scaffold
export default defineConfig({
  plugins: [
    react({
      // keep classic runtime if you still want `import React from 'react'`
      // jsxRuntime: 'classic',
    }),
  ],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
})
