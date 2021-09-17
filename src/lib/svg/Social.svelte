<script lang="ts">
	import GitHub from './GitHub.svelte';
	import Twitter from './Twitter.svelte';
	export let type: 'github' | 'twitter';
	export let value: string;

	export let scale = 1;
	export let x = 0;
	export let y = 0;
</script>

<g transform="translate({x},{y}) scale({scale})">
	<svelte:component this={type === 'github' ? GitHub : Twitter} />
	<text x="70" y="35" font-size="32">{value}</text>
</g>
