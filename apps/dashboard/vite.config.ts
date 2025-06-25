/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import federation from '@originjs/vite-plugin-federation';               // 👈 NEW

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/dashboard',
  server: { port: 4301, host: 'localhost' },
  preview: { port: 4301, host: 'localhost' },
  base: "/ai-invest-assistant/",
  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    federation({                                              // 👈 NEW
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './DashboardPage': './src/app/app.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],

  build: {
    outDir: '../../dist/apps/dashboard',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
    target: 'esnext',                                         // good for MF
  },

  define: { 'import.meta.vitest': undefined },
}));
