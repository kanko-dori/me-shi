<script lang="ts">
	import { Svg } from '$lib/svg';
	import QRcode from 'qrcode-svg';
	import hash from 'object-hash';

	export let content: string;
	export let color: string | { color: string; offset: number }[] = '#000000';

	const id = hash(content);
	const fill = typeof color === 'string' ? color : `url(#${id})`;

	let qrcode: QRcode = new QRcode(content);
	$: qrcode = new QRcode({
		content,
		color: '',
		join: true
	});
</script>

<Svg class={$$props.class} style="fill:{fill}; {$$props.style ?? ''}" width={256} height={256}>
	<defs>
		<linearGradient {id}>
			{#if typeof color !== 'string'}
				{#each color as c}
					<stop style="stop-color:{c.color}" offset="{c.offset}%" />
				{/each}
			{/if}
		</linearGradient>
	</defs>
	{@html qrcode.svg()}
</Svg>
