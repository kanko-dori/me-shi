<script lang="ts">
	import { Header, Input, Button, Footer } from '$lib/components';
	import Static from '$lib/svg/Static.svelte';
	let myname: string = '';
	let githubId: undefined | string = undefined;
	let twitterId: undefined | string = undefined;
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

<div class="flex px-8">
	<Button class="bg-gray-300">Cancel</Button>
	<div class="flex-grow" />
	<Button class="bg-blue-600 text-white">Apply</Button>
</div>

<Footer />
