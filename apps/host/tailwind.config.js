// apps/host/tailwind.config.js
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ⬇️ everything inside the host itself
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html,js,jsx}'),

    // ⬇️  NEW: all source files of the upload remote
    //
    //     ├─ apps
    //     │   ├─ host   ← you are here   (__dirname)
    //     │   └─ upload ← we want these!
    join(__dirname, '../upload/src/**/*.{ts,tsx,html,js,jsx}'),

    // ⬇️  NEW: all source files of the upload remote
    //
    //     ├─ apps
    //     │   ├─ host   ← you are here   (__dirname)
    //     │   └─ dashboard ← we want these!
    join(__dirname, '../dashboard/src/**/*.{ts,tsx,html,js,jsx}'),

    // ⬇️  NEW (optional but handy): any shared libs
    join(__dirname, '../../libs/**/*.{ts,tsx,html,js,jsx}'),

    // ⬇️ everything that Nx already knows is a *direct dependency*
    //    of the host (leave this last so it can splice in more globs)
    ...createGlobPatternsForDependencies(__dirname),
  ],

  theme: {
    extend: {},
  },
  plugins: [],
};
