/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/upload',
  server: { port: 4302, host: 'localhost' },
  preview: { port: 4302, host: 'localhost' },
  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    federation({                                              // 👈 NEW
      name: 'upload',
      filename: 'remoteEntry.js',
      exposes: {
        './UploadPage': './src/app/app.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],

  build: {
    outDir: '../../dist/apps/upload',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
    target: 'esnext',                                         // good for MF
  },

  define: { 'import.meta.vitest': undefined },
}));
