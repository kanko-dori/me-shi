<script lang="ts">
	export let width = 100;
	export let height = 100;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width="{width}px"
	height="{height}px"
	viewBox="0 0 {width} {height}"
>
	<slot />
</svg>
