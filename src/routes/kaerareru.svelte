<script>
	import { Header, Input, Footer } from '$lib/components';
	import Static from '$lib/svg/Static.svelte';
	let myname = '';
	let githubId = '';
	let twitterId = '';
</script>

<Header />

<div class="aspect-w-3 aspect-h-1 mx-auto">
	<Static name={myname} github={githubId} />
</div>

<div class="m-4 p-8 border">
	<p>Name</p>
	<Input bind:value={myname} placeholder="" class="m-2 w-full" />
	<p>{myname}</p>
</div>
<div class="m-4 p-8 border">
	<p>GitHub ID</p>
	<Input bind:value={githubId} placeholder="" class="m-2 w-full" />
	<p>{githubId}</p>
</div>
<div class="m-4 p-8 border">
	<p>twitterId</p>
	<Input bind:value={twitterId} placeholder="" class="m-2 w-full" />
	<p>{twitterId}</p>
</div>

<Footer />
