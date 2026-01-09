import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@base': path.resolve(__dirname, 'src/base'),
      '@store': path.resolve(__dirname, 'src/store'),
    },
  },

  server: {
    host: true,

    port: 5173,
    strictPort: true,

    proxy: {
      '^/(sanctum|api)': {
        target: 'http://nginx', // ← devcontainerから見たBE(nginx)に合わせる
        changeOrigin: false,
      },
    },
  },
});
