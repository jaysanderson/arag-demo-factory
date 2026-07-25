import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The browser bundle never talks to Nuclia directly — every /api/* call goes to
// the Express server (server/index.mjs), which holds the service-account token.
// In dev, Vite serves the UI on :5173 and proxies /api to the API server.
const API_PORT = process.env.API_PORT || '4000';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: `http://localhost:${API_PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
