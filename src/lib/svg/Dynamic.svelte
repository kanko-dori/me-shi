<script lang="ts">
	import Svg from './Svg.svelte';
	import Logo from './Logo.svelte';
	import type { Product } from 'src/generated/graphql';

	export let event: string;
	export let team: string;
	export let product: Product;
	export let usedTechnologies: string[] | undefined = undefined;
	export let preferedTechnologies: string[] | undefined = undefined;
	export let memberOf: string | undefined = undefined;
</script>

<Svg width={1200} height={630} class={$$props.class} style={$$props.style}>
	<rect x="0" y="0" width="1200" height="630" fill="#fefef9" />
	<path
		fill="#999999"
		d="M 888.76562 58.345703 L 670.61133 630 L 831.40625 630 L 1200 497.1543 L 1200 358.31641 L 888.76562 58.345703 z M 920.36719 199.91602 L 1156.7266 427.71484 L 781.88281 562.81055 L 920.36719 199.91602 z"
	/>
	<g transform="translate(110, 130)">
		<text font-size="28">{event}</text>
		<text y="50" fill="#4d4d4d" font-size="24">{team}</text>
		<text y="140" font-size="72" font-weight="bold">{product.name}</text>
	</g>
	{#if usedTechnologies !== undefined && usedTechnologies.length > 0}
		<g transform="translate(110, 390)">
			<text fill="#4d4d4d" font-size="24">今回使った技術</text>
			<text x="250" font-size="32">{[...new Set(usedTechnologies)].join(', ')}</text>
		</g>
	{/if}
	{#if preferedTechnologies !== undefined && preferedTechnologies.length > 0}
		<g transform="translate(110, 450)">
			<text fill="#4d4d4d" font-size="24">いつも使ってる技術</text>
			<text x="250" font-size="32">{[...new Set(preferedTechnologies)].join(', ')}</text>
		</g>
	{/if}
	{#if memberOf !== undefined}
		<g transform="translate(110, 560)">
			<text fill="#4d4d4d" font-size="24">所属</text>
			<text x="80" font-size="32">{memberOf}</text>
		</g>
	{/if}
	<g transform="translate(860,550)">
		<text y="30" font-size="20">made with</text>
		<Logo scale={5} x={20.5} />
	</g>
</Svg>

<style>
	text {
		font-family: 'Noto Sans JP', Meiryo, Arial, Helvetica, sans-serif;
	}
</style>
