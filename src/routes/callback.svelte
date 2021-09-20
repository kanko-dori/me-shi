<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth, getToken, getUser, waitForSignIn } from '$lib/auth';
	import { login } from '$lib/graphql/query';
	import { onMount } from 'svelte';

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
				goto('/components_demo').then(auth.reload);
			})
			.catch(() => goto('/'));
	});
</script>

<p>Loading...</p>
