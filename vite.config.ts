import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/siteForLehaSTR/',
  plugins: [react()],
  server: {
    port: 8087,
    strictPort: true,
  },
});
