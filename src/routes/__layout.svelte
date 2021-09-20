<script lang="ts">
	import '../app.postcss';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
		rel="stylesheet"
	/>
	<script>
		if (global === undefined) var global = window;
	</script>
</svelte:head>

<slot />

<style>
	* {
		font-family: 'Noto Sans JP', Meiryo, Arial, Helvetica, sans-serif;
	}
</style>
