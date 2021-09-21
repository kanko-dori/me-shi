<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth, getToken, getUser, waitForSignIn } from '$lib/auth';
	import { login } from '$lib/graphql/query';
	import { onMount } from 'svelte';
	import { Loading } from '$lib/components';

	onMount(() => {
		waitForSignIn()
			.then(() => Promise.all([getUser(), getToken()]))
			.then(([user, token]) =>
				login(
					{
						input: {
							name: user?.name ?? user?.nickname ?? 'octocat',
							githubId: user?.nickname ?? 'octocat',
							iconURL: user?.picture ?? `https://github.com/${user?.nickname ?? 'octocat'}`
						}
					},
					{
						Authorization: token ?? ''
					}
				)
			)
			.then(() => {
				goto('/tsunageru').then(auth.reload);
			})
			.catch(() => goto('/'));
	});
</script>

<div class="w-screen h-screen flex justify-center items-center">
	<Loading />
</div>
