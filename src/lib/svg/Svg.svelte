<script lang="ts">
	export let width = 1;
	export let height = 1;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 {width} {height}"
	class={$$props.class}
	style={$$props.style}
>
	<slot />
</svg>
