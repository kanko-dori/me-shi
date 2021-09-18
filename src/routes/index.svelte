<script>
	import { Static } from '$lib/svg';
	import Header from '$lib/components/Header.svelte';
</script>

<div />
<Header />
<div class="bg-blue-300">
	<div class="card1" />
	<div class="card2" />
</div>
<div class="bg-blue-200 h-64">
	<div class="absolute opacity-75 border-4 h-1/3 w-1/2 z-0 mt-0 bg-blue-100 border-gray-800" />
	<div class="absolute opacity-75 border-4 h-1/3 w-1/2 z-10 mt-1 bg-blue-400 border-gray-800" />
	<div class="absolute bg-blue-300 z-20 mt-2">
		<p>名刺でつながる、</p>
		<p>名刺でつなげる。</p>
	</div>
</div>

<!-- <div>
	<Static name="閑古鳥" github="kanko-dori" />
</div> -->
<style>
	div.card1 {
		position: absolute;
		background-color: antiquewhite;
		height: 55px;
		width: 99px;
	}
	div.card2 {
		position: absolute;
		background-color: antiquewhite;
		height: 10px;
		width: 10px;
	}
</style>
