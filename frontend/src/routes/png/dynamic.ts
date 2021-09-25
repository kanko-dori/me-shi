import base64 from 'base-64';
import type { RequestHandler } from '@sveltejs/kit';
import 'isomorphic-fetch';

export const get: RequestHandler = async ({ query }) => {
	const q = base64.decode(query.get('b64') ?? '');
	console.log(q);
	const url = new URL(`https://svg2png.deno.dev/https://me-shi.ga/svg/dynamic?${q}`);
	const arrayBuffer = await fetch(url.toString()).then((res) => res.arrayBuffer());

	return {
		headers: {
			'content-type': 'image/png'
		},
		body: new Uint8Array(arrayBuffer)
	};
};
