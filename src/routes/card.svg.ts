import type { RequestHandler } from '@sveltejs/kit';
import Svg from '$lib/svg/Svg.svelte';

type SvelteComponent = {
	render: (props: any) => { html: string; css: { code: string } };
};

export const get: RequestHandler = ({ query }) => {
	const name = query.get('name');
	const twitter = query.get('twitter');
	const github = query.get('github');
	const { html, css } = ((Svg as unknown) as SvelteComponent).render({ name, twitter, github });
	return {
		headers: {
			'Content-type': 'image/svg+xml'
		},
		body: html.replace('</svg>', `<style>${css.code}</style></svg>`)
	};
};
