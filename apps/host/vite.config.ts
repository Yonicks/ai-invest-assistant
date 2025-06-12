/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }: { mode: string }) => {
  const isDev = mode === 'development'; // vite sets this for us

  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/host',

    server: { port: 4200, host: 'localhost' },
    preview: { port: 4300, host: 'localhost' },
    base: '/ai-invest-assistant/',
    plugins: [
      react(),
      nxViteTsPaths(),
      nxCopyAssetsPlugin(['*.md']),
      federation({
        name: 'host',
        remotes: isDev
          ? {
              // live dev servers --------------------------
              dashboard: 'http://localhost:4301/assets/remoteEntry.js',
              upload: 'http://localhost:4302/assets/remoteEntry.js',
            }
          : {
              // production / GitHub Pages -----------------
            dashboard: '/ai-invest-assistant/dashboard/assets/remoteEntry.js',
            upload:    '/ai-invest-assistant/upload/assets/remoteEntry.js',
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
  };
});
