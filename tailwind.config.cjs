const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
		fontFamily: {
			body: ['"Noto Sans JP"', '"Meiryo"', '"Arial"', '"Helvetica"', '"sans-serif"']
		}
	},
	plugins: [require('@tailwindcss/aspect-ratio')]
};

module.exports = config;
