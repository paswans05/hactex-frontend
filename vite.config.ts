import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Hactex React 19 edition — Vite + React + Tailwind v4.
// app.css (shared --at-* token core) is imported once in src/main.tsx.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5181,
    open: '/',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
