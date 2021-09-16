<script lang="ts">
	export let name: string;
	export let twitter: string;
	export let github: string;
</script>

<svg xmlns="http://www.w3.org/2000/svg" width="700px" height="400px" viewBox="0 0 700 400">
	<text x="0" y="35" fill="black" font-family="sans-serif" font-size="35">{name}</text>
	<text x="0" y="70" fill="black" font-family="sans-serif" font-size="35">{twitter}</text>
	<text x="0" y="105" fill="black" font-family="sans-serif" font-size="35">{github}</text>
</svg>

<style>
	text {
		animation: fadein 1s ease 0.2s 1 normal both;
		fill: #333;
	}
	@keyframes fadein {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
