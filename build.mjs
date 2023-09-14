// esbuild.config.js
import * as esbuild from 'esbuild';
import {sassPlugin} from 'esbuild-sass-plugin'
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import fs from 'fs';

// Your esbuild configuration
const buildConfig = {
	outdir: './dist/assets',
	entryPoints: [
		{ out: './bootstrap.min', in: './node_modules/bootstrap/dist/js/bootstrap.js' },
		{ out: './main', in: './src/main.js' },
		{ out: './qld.bootstrap', in: './src/scss/main.scss' },
  	],
  	bundle: false,
  	minify: false,
	metafile: true,
	loader: {
		'.html' : 'text'
	},
  	plugins: [
		//Handle CSS compile
		sassPlugin({
			async transform(source) {
				const { css } = await postcss([autoprefixer]).process(source, { from: 'src/main.scss', to: 'dist/assets/qld.bootstrap.css', map: true });
				return css;
			},
		}),
  	]
};


// Call esbuild's build() function with our configuration
await esbuild.build(buildConfig)
	.then(() => console.log('⚡ Build successful ⚡'))
	.catch((error) => console.error('Build error:', error));