<script>
	import { Static } from '$lib/svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { auth } from '$lib/auth';

	let eyecatchWidth = 100;
</script>

<Header />
<main class="container max-w-screen-xl mx-auto px-4">
	<section class="relative aspect-w-3 aspect-h-2" bind:clientWidth={eyecatchWidth}>
		<div class="card card1 absolute border-2 border-gray-300 bg-gray-100 opacity-50" />
		<div class="card card2 absolute border-2 border-gray-300 bg-gray-100 opacity-50" />
		<div class="catch-copy absolute z-20 font-bold" style="--parent-width: {eyecatchWidth}px">
			<p>名刺でつながる、</p>
			<p>名刺がつなげる。</p>
		</div>
	</section>
	<div class="text-lg p-4">
		<p>イベントで見つけたあの人ともう少しだけつながってみませんか？</p>
		<p>me-shiは、あと「少しだけ」つながる場を提供します。</p>
	</div>
	<section class="aspect-w-3 aspect-h-1 mx-auto">
		<Static name="閑古鳥" github="kanko-dori" class="w-3/5 mx-auto border-gray-300 border-2" />
	</section>
	<section class="text-lg p-4">
		<p>つながった人には感想を残しましょう</p>
		<p>成果物の感想欲しくない？？</p>
	</section>
	<section class="text-lg p-4">
		<p>もし、今日がイベント最終日なら少しだけ繋がってみましょう！</p>
		<p class="text-center p-8">
			<button on:click={auth.signIn} class="bg-black text-white px-8 py-4 rounded-2xl">
				Sign in with GitHub
			</button>
		</p>
	</section>
</main>

<Footer />

<style>
	.card {
		width: 60%;
		height: 0;
		padding-top: 40%;
	}
	.card1 {
		top: 10%;
		left: 30%;
	}
	.card2 {
		top: 30%;
		left: 10%;
	}
	.catch-copy {
		font-size: calc(var(--parent-width) / 10);
		top: 25%;
		left: 5%;
	}
</style>
