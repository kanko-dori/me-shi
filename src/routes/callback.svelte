<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth0 } from '$lib/auth/auth0';
	import { onMount } from 'svelte';

	onMount(() => {
		auth0.handleRedirectCallback().then(() => goto('/components_demo'));
	});
</script>

<p>Loading...</p>
