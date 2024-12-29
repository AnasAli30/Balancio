import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      fs: path.resolve('node_modules/memfs'), // Absolute path to memfs
      util: 'util/',
      stream: 'stream-browserify',
      path: 'path-browserify',
      url: 'url/',
      process: 'process/browser'
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
});
