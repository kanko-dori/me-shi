import type { RequestHandler } from '@sveltejs/kit';
import { Dynamic } from '$lib/svg';

type SvelteComponent = {
	render: (props: unknown) => { html: string; css: { code: string } };
};

export const get: RequestHandler = ({ query }) => {
	const event = query.get('event');
	const team = query.get('team');
	const productName = query.get('product_name');
	const usedTechnologies = query.getAll('usedTechnology');
	const preferedTechnologies = query.getAll('preferedTechnology');
	const memberOf = query.get('memberOf');

	const { html, css } = (Dynamic as unknown as SvelteComponent).render({
		event,
		team,
		product: { name: productName },
		usedTechnologies,
		preferedTechnologies,
		memberOf
	});
	return {
		headers: {
			'Content-type': 'image/svg+xml'
		},
		body: html.replace('</svg>', `<style>${css.code}</style></svg>`)
	};
};
