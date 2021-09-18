<script lang="ts">
	import Logo from '$lib/svg/Logo.svelte';
	import Svg from '$lib/svg/Svg.svelte';

	export let githubId: string | undefined = undefined;
</script>

<header class="py-4" role="banner" aria-label="me-shi">
	<div class="container mx-auto flex items-center">
		<a href="/" class="outline-none focus:ring-2">
			<Svg width={200} height={50}>
				<Logo scale={5} x={2} y={1} />
			</Svg>
		</a>
		<div class="flex-grow" />
		<p class="pr-4 text-right no-underline">
			{#if githubId === undefined}
				Sign in with GitHub
			{:else}
				<img
					class="h-10 rounded-full ring-2 focus:ring-4"
					src="https://github.com/{githubId}.png"
					alt="user icon"
				/>
			{/if}
		</p>
	</div>
</header>
