<script lang="ts">
	import Svg from './Svg.svelte';
	import Logo from './Logo.svelte';
	import Social from './Social.svelte';

	export let name: string;
	export let github: string | undefined = undefined;
	export let twitter: string | undefined = undefined;
</script>

<Svg width={1200} height={630} class={$$props.class} style={$$props.style}>
	<path
		fill="#999999"
		d="M 951.3848 0 L 782.57617 630 L 834.33789 630 L 1003.1504 0 L 951.3848 0 z"
	/>
	<path
		fill="#999999"
		d="M 1029.6543 0 L 860.8418 630 L 943.66406 630 L 1112.4746 0 L 1029.6543 0 z"
	/>
	<g transform="translate(110, 130)">
		<text fill="#808080" font-size="28">Handle name</text>
		<text y="140" font-size="128" font-weight="bold">{name}</text>
	</g>
	<g transform="translate(860,550)">
		<text y="30" font-size="20">made with</text>
		<Logo scale={5} x={20.5} />
	</g>
	{#if twitter !== undefined}
		<Social type="twitter" value={twitter} scale={1.8} x={110} y={360} />
	{/if}
	{#if github !== undefined}
		<Social type="github" value={github} scale={1.8} x={110} y={460} />
	{/if}
</Svg>

<style>
	text {
		font-family: 'Noto Sans JP', Meiryo, Arial, Helvetica, sans-serif;
	}
</style>
