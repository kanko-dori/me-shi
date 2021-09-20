<script lang="ts">
	import { Header, Input, Footer } from '$lib/components';
	import Static from '$lib/svg/Static.svelte';
	let myname: string = '';
	let githubId: undefined | string = undefined;
	let twitterId: undefined | string = undefined;
	function cancel() {}
	function apply() {}
</script>

<Header />

<div class="aspect-w-3 aspect-h-1 mx-auto">
	<Static name={myname} github={githubId} twitter={twitterId} />
</div>

<div class="m-4 p-8 border">
	<p>Name</p>
	<Input bind:value={myname} placeholder="" class="m-2 w-full" />
</div>
<div class="m-4 p-8 border">
	<p>GitHub ID</p>
	<Input bind:value={githubId} placeholder="" class="m-2 w-full" />
</div>
<div class="m-4 p-8 border">
	<p>twitterId</p>
	<Input bind:value={twitterId} placeholder="" class="m-2 w-full" />
</div>

<div class="container mx-auto flex">
	<button class="border" on:click={cancel}>Cancel</button>
	<div class="flex-grow" />
	<button class="border" on:click={apply}>Apply</button>
</div>

<Footer />
