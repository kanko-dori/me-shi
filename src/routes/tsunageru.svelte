<script lang="ts">
	import { token } from '$lib/auth';

	import { onMount } from 'svelte';

	onMount(() => {
		token.subscribe(console.log);
	});
</script>

<div>done</div>
