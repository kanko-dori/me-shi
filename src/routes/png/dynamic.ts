import type { RequestHandler } from '@sveltejs/kit';
import 'isomorphic-fetch';

export const get: RequestHandler = async ({ query }) => {
	const url = new URL(`https://svg2png.deno.dev/https://me-shi.ga/svg/dynamic?${query.toString()}`);
	const arrayBuffer = await fetch(url.toString()).then((res) => res.arrayBuffer());

	return {
		headers: {
			'content-type': 'image/png'
		},
		body: new Uint8Array(arrayBuffer)
	};
};
