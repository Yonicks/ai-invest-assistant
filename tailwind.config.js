// tailwind.config.js  (workspace root)
const { join } = require('path');
const {
  createGlobPatternsForDependencies,
} = require('@nx/react/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // 🔍  Scan *all* app and lib source files so every utility is always built.
  content: [
    // Any file in any app
    join(__dirname, 'apps/**/{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}'),
    // Any file in any shared lib
    join(__dirname, 'libs/**/*.{ts,tsx,js,jsx,html}'),
    // Nx will add deep-linked workspace libs here
    ...createGlobPatternsForDependencies(__dirname),
  ],

  // 🌈  Design tokens & plugins live here (extend at will)
  theme: {
    extend: {},
  },
  plugins: [],
};
