import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// BASE_PATH is set by the GitHub Pages workflow ("/bca/"); local dev and Apache hosting use "/".
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  server: { port: 5173 },
  build: {
    rollupOptions: {
      output: {
        manualChunks: { motion: ['gsap', 'lenis'], react: ['react', 'react-dom', 'react-router-dom'] },
      },
    },
  },
});
