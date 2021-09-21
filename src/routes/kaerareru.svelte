<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth, token } from '$lib/auth';
	import { Button, Footer, Header, Input } from '$lib/components';
	import { updateUser } from '$lib/graphql/query/updateUser';
	import { user } from '$lib/store';
	import { Static } from '$lib/svg';

	let name = '';
	let githubId = '';
	let twitterId = '';

	user.subscribe((u) => {
		if (u.type !== 'success') return;
		name = u.value.name ?? 'Error';
		githubId = u.value.githubId ?? 'Error';
		twitterId = u.value.twitterId ?? '';
	});

	const onSubmit = () => {
		if ($token.type !== 'success') {
			console.error('token is not loaded', $token);
			return;
		}
		console.log('submitted', { name, githubId, twitterId });
		updateUser(
			{
				input: {
					name,
					githubId,
					twitterId
				}
			},
			{
				Authorization: $token.value ?? ''
			}
		)
			.then(() => {
				console.log('updateUser done.');
				auth.reload();
				goto('/tsunageru');
			})
			.catch((e: Error) => {
				console.error(e);
			});
	};
</script>

<Header />
<main class="container max-w-screen-lg px-4">
	<div class="p-8">
		<div class="max-w-3xl w-full mx-auto">
			<Static {name} github={githubId} twitter={twitterId || undefined} class="w-full shadow-xl" />
		</div>
	</div>
	<form class="block p-4 max-w-2xl mx-auto" on:submit|preventDefault={onSubmit}>
		<div class="p-4">
			<p class="text-sm text-gray-500">名前</p>
			<Input class="w-full" bind:value={name} />
		</div>
		<div class="p-4">
			<p class="text-sm text-gray-500">GitHub ID</p>
			<Input class="w-full" bind:value={githubId} />
		</div>
		<div class="p-4">
			<p class="text-sm text-gray-500">Twitter ID</p>
			<Input class="w-full" bind:value={twitterId} />
		</div>
		<div class="p-4 flex">
			<Button class="hover:shadow transition-shadow bg-gray-300">Cancel</Button>
			<div class="flex-grow" />
			<Button class="hover:shadow transition-shadow bg-blue-500 text-white" type="submit"
				>Apply</Button
			>
		</div>
	</form>
</main>
<Footer />
