<script lang="ts">
	import { Svg, Logo } from '$lib/svg';
	import { goto } from '$app/navigation';
	import { auth, getToken, getUser, waitForSignIn } from '$lib/auth';
	import { login } from '$lib/graphql/query';
	import { onMount } from 'svelte';
	import Connect16 from 'carbon-icons-svelte/lib/Connect16';

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
	<div class="flex flex-col items-center">
		<Svg width={200} height={50} style="width:200px;height:50px;">
			<Logo scale={5} x={2} y={1} />
		</Svg>
		<div class="h-4" />
		<p class="rota">
			<Connect16 class="w-12 h-12" />
		</p>
		<p>Signing in...</p>
	</div>
</div>

<style lang="postcss">
	.rota {
		animation: rot 1s ease 0s infinite;
	}

	@keyframes rot {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(720deg);
		}
	}
</style>
