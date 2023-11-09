// esbuild.config.js

import * as esbuild from 'esbuild';
import {sassPlugin} from 'esbuild-sass-plugin';

import handlebarsPlugin from "esbuild-plugin-handlebars";
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import { copy } from 'esbuild-plugin-copy';

// Your esbuild configuration
const buildConfig = {
	outdir: './dist/',
	external: ['fs', 'path'],
	entryPoints: [
		{ out: './assets/js/bootstrap.min', in: './node_modules/bootstrap/dist/js/bootstrap.js' },
		{ out: './assets/js/main', in: './src/main.js' },
		{ out: './assets/css/qld.bootstrap', in: './src/main.scss' },
  	],
  	bundle: true,
  	minify: false,
	loader: {
		'.html' : 'text',
		'.js': 'jsx'
	},
	target: ['es6'],
  	plugins: [
		//Handle CSS compile
		sassPlugin({
			type: 'css',
			async transform(source) {
				const { css } = await postcss([autoprefixer]).process(source, { 
					from: 'src/main.scss', 
					to: 'dist/assets/css/qld.bootstrap.css', 
					map: true
				});
				return css;
			},
		}),
		handlebarsPlugin(),
		copy({
			// this is equal to process.cwd(), which means we use cwd path as base path to resolve `to` path
			// if not specified, this plugin uses ESBuild.build outdir/outfile options as base path.
			resolveFrom: 'cwd',
			assets: [
				{
			  		from: ['./src/templates/*.html'],
			  		to: ['./dist/'],
				},
				{
					from: ['./src/components/**/*.dxp.html'],
					to: ['./dist/components/dxp/'],
			  	},
				{
					from: ['./src/components/**/*.bs5.html'],
					to: ['./dist/components/bs5/'],
			  	},
				{
					from: ['./src/components/**/*.hbs.html'],
					to: ['./dist/components/dxp/'],
			  	},
				{
					from: ['./src/img/*'],
					to: ['./dist/assets/img'],
				},
				{
					from: ['./dist/**/*'],
					to: ['./docs/'],
				}
			],
			watch: true,
		}),
  	]
};

// Call esbuild's build() function with our configuration
(async () => {
	await esbuild.build(buildConfig);
	console.log('⚡ Build successful ⚡');
})();