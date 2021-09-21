<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let open = false;

	type EventMap = {
		outsideclick: never;
	};
	const dispatch = createEventDispatcher<EventMap>();
</script>

{#if open}
	<div
		class="fixed top-0 left-0 w-screen h-screen bg-gray-800 opacity-50"
		on:click={() => dispatch('outsideclick')}
	/>
	<slot />
{/if}
