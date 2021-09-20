<script lang="ts">
	import { Header, Input, Button, Footer } from '$lib/components';
	import Static from '$lib/svg/Static.svelte';
	let name: string = '';
	let github: undefined | string = undefined;
	let twitter: undefined | string = undefined;
	function cancelClick() {
		alert('Cancel Clicked');
	}
	function applyClick() {
		alert('apply Clicked');
	}
</script>

<Header />

<div class="aspect-w-3 aspect-h-1 mx-auto">
	<Static {name} {github} {twitter} />
</div>
<div class="container mx-auto">
	<div class="m-4 p-8 border">
		<p class="t-size">Name</p>
		<Input bind:value={name} placeholder="" class="m-2 w-full" />
	</div>
	<div class="m-4 p-8 border">
		<p class="t-size">GitHub ID</p>
		<Input bind:value={github} placeholder="" class="m-2 w-full" />
	</div>
	<div class="m-4 p-8 border">
		<p class="t-size">twitter ID</p>
		<Input bind:value={twitter} placeholder="" class="m-2 w-full" />
	</div>
</div>

<div class="container mx-auto flex px-8">
	<Button class="bg-gray-300" on:click={cancelClick}>Cancel</Button>
	<div class="flex-grow" />
	<Button class="bg-blue-600 text-white" on:click={applyClick}>Apply</Button>
</div>

<Footer />

<style>
	.t-size {
		font-size: 3vw;
	}
</style>
