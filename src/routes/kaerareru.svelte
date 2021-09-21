<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth, token } from '$lib/auth';
	import { Button, Footer, Header, Input, Modal, Loading } from '$lib/components';
	import { updateUser } from '$lib/graphql/query/updateUser';
	import { user } from '$lib/store';
	import { Static } from '$lib/svg';

	let name = '';
	let githubId = '';
	let twitterId = '';
	let processing = true;
	let showOnUpdateModal = false;

	user.subscribe((u) => {
		if (u.type !== 'success') return;
		processing = false;
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
		processing = true;
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
				showOnUpdateModal = true;
			})
			.catch((e: Error) => {
				console.error(e);
			})
			.finally(() => {
				processing = false;
			});
	};
</script>

<Header />
<main class="container mx-auto max-w-screen-lg px-4">
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
			<Button
				class="hover:shadow transition-shadow bg-gray-300"
				on:click={() => goto('/tsunageru')}
			>
				Cancel
			</Button>
			<div class="flex-grow" />
			<Button class="hover:shadow transition-shadow bg-blue-500 text-white" type="submit">
				Apply
			</Button>
		</div>
	</form>
</main>

<Modal open={processing}>
	<div class="z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
		<Loading />
	</div>
</Modal>
<Modal open={showOnUpdateModal}>
	<div
		class="max-w-4xl p-8 bg-white rounded-md shadow-md z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
	>
		<h3 class="py-4">更新しました！</h3>
		<div class="flex">
			<div class="flex-grow" />
			<button
				class="bg-blue-500 rounded text-white py-2 px-4"
				on:click={() => {
					goto('/tsunageru');
					showOnUpdateModal = false;
				}}
			>
				OK
			</button>
		</div>
	</div>
</Modal>

<Footer />
