/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import federation from '@originjs/vite-plugin-federation';               // 👈 NEW

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/host',

  server: { port: 4200, host: 'localhost' },                  // host stays 4200
  preview: { port: 4300, host: 'localhost' },

  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    federation({                                              // 👈 NEW
      name: 'host',
      remotes: {
        /* dev URL for the dashboard’s remoteEntry */
        dashboard: 'http://localhost:4301/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],

  build: {
    outDir: '../../dist/apps/host',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
    target: 'esnext',
  },

  define: { 'import.meta.vitest': undefined },
}));
