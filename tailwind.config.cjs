const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	corePlugins: {
		fontFamily: false
	},
	plugins: [require('@tailwindcss/aspect-ratio')]
};

module.exports = config;
