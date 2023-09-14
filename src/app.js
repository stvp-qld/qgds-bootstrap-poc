const esbuild = require('esbuild');
const path = require('path');

esbuild.build({
  entryPoints: ['./src/main.js'], // Entry points (can be an array of entry files)
  bundle: true, // Bundle all dependencies into a single output file
  outfile: './dist/bundle.js', // Output file
  minify: true, // Minify the output
}).catch(() => process.exit(1));
