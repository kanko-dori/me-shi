<script>
	import { Static } from '$lib/svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Header />
<div class="card">
	<div class="top">top</div>
	<div class="botom">botom</div>
	<div class="copy">
		<p>名刺でつながる、</p>
		<p>名刺でつなげる。</p>
	</div>
</div>

<!-- <div class="static aspect-w-10 aspect-h-5">
		<Static name="閑古鳥" github="kanko-dori" />
	</div>
<Footer />
 -->
<style>
	.card {
		position: relative;
	}
	.top,
	.botom {
		position: absolute;
		border-color: gray;
		background-color: ghostwhite;
		border-width: 0.1em;
		width: 50%;
		padding-top: calc(50% * 0.6);
		opacity: 0.7;
	}
	.botom {
		z-index: 1;
		top: 0;
		right: 15%;
	}
	.top {
		z-index: 2;
		margin-top: 10%;
		left: 15%;
	}
	.copy {
		position: absolute;
		left: 25%;
		z-index: 3;
		margin-top: 10%;
		font-size: fill;
	}
</style>
