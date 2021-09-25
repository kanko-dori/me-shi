<script lang="ts">
	import { auth, signedIn, authUser } from '$lib/auth';
	import Logo from '$lib/svg/Logo.svelte';
	import Svg from '$lib/svg/Svg.svelte';

	export let showSignOut = false;
	const fallbackImg = 'https://github.com/octocat.png';
</script>

<header class="py-4" role="banner" aria-label="me-shi">
	<div class="container mx-auto flex items-center">
		<a href="/" class="outline-none focus:ring-2">
			<Svg width={200} height={50} style="width:200px;height:50px;">
				<Logo scale={5} x={2} y={1} />
			</Svg>
		</a>
		<div class="flex-grow" />
		<p class="pr-4 text-right">
			{#if $signedIn.type === 'success' && $signedIn.value}
				{#if showSignOut}
					<button on:click={auth.signOut}>Sign out</button>
				{:else}
					<a href="/tsunageru">
						<img
							class="h-10 rounded-full ring-2 focus:ring-4"
							src={$authUser.type === 'success'
								? $authUser.value?.picture ?? fallbackImg
								: fallbackImg}
							alt="user icon"
						/>
					</a>
				{/if}
			{:else}
				<button on:click={auth.signIn}>Sign in with GitHub</button>
			{/if}
		</p>
	</div>
</header>
