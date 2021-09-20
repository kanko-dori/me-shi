import adapt from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';
import { optimizeImports } from 'carbon-preprocess-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		}),
		optimizeImports()
	],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapt(),
		vite: {
			resolve: {
				alias: {
					'./runtimeConfig': './runtimeConfig.browser'
				}
			},
			build: {
				rollupOptions: {
					output: {
						intro: 'if(exports === undefined){var exports ={}; var self = {}}'
					}
				}
			}
		}
	}
};

export default config;
