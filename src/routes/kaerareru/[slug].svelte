<script lang="ts">
	import { Header, Footer, Input, Button } from '$lib/components';
	import { Static } from '$lib/svg';

	export let name = '';
	export let github = '';
	export let twitter = '';

	const onSubmit = () => {
		console.log('submitted', { name, github, twitter });
	};
</script>

<Header />
<main class="container max-auto max-w-screen-lg px-4">
	<div class="p-8">
		<div class="max-w-3xl w-full mx-auto">
			<Static {name} {github} twitter={twitter || undefined} class="w-full shadow-xl" />
		</div>
	</div>
	<form class="block p-4 max-w-2xl mx-auto" on:submit|preventDefault={onSubmit}>
		<div class="p-4">
			<p class="text-sm text-gray-500">名前</p>
			<Input class="w-full" bind:value={name} />
		</div>
		<div class="p-4">
			<p class="text-sm text-gray-500">GitHub ID</p>
			<Input class="w-full" bind:value={github} />
		</div>
		<div class="p-4">
			<p class="text-sm text-gray-500">Twitter ID</p>
			<Input class="w-full" bind:value={twitter} />
		</div>
		<div class="p-4 flex">
			<Button class="hover:shadow transition-shadow bg-gray-300">Cancel</Button>
			<div class="flex-grow" />
			<Button class="hover:shadow transition-shadow bg-blue-500 text-white">Apply</Button>
		</div>
	</form>
</main>
<Footer />
