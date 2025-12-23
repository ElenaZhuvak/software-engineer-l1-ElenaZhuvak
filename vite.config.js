import { defineConfig } from 'vite';

export default defineConfig({
  base: '/software-engineer-l1-ElenaZhuvak/',
  root: '.',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
