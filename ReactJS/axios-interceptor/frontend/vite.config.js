import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    minify: true, // Enable minification
  },
  plugins: [
    react(),
    // viteCompression({
    //   algorithm: 'gzip', // Use gzip compression
    // }),
  ],
});