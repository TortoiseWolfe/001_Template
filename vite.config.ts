import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Update this for GitHub Pages: '/repo-name/'
  server: {
    host: true, // Needed for Docker
    port: 5173,
    watch: {
      usePolling: true, // Needed for hot reload in Docker
    },
  },
  build: {
    // Cache busting with content hash
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});
