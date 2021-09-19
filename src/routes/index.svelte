<script>
	import { Static } from '$lib/svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Header />
<div class="container mx-auto">
	<div class="relative aspect-w-2 aspect-h-1">
		<div class="relative">
			<div class="top absolute z-10 w-1/2 opacity-75 border-2 border-gray-600 bg-gray-100">top</div>
			<div class="bottom absolute z-0 top-0 w-1/2 opacity-75 border-2 border-gray-600 bg-gray-100">
				bottom
			</div>
			<div class="catch-copy absolute z-20">
				<p>名刺でつながる、</p>
				<p>名刺がつなげる。</p>
			</div>
		</div>
	</div>
</div>
<div class="containar mx-auto relative">
	<div class="aspect-w-6 aspect-h-1 bg-gray-300">
		<div class="absolute p-left">
			<p>イベントで見つけたあの人ともう少しだけつながってみませんか？</p>
			<p>me-shiは、あと「少しだけ」つながる場を提供します。</p>
		</div>
	</div>
</div>
<div class="aspect-w-2 aspect-h-1 w-3/4 mx-auto">
	<Static name="閑古鳥" github="kanko-dori" />
</div>
<div class="absolute p-left">
	<p>つながった人には感想を残しましょう</p>
	<p>成果物の感想欲しくない？？</p>
</div>

<Footer />

<style>
	.top {
		padding-top: 20vw;
		margin-top: 10vw;
		left: 5vw;
	}
	.bottom {
		padding-top: 20vw;
		right: 10vw;
	}
	.catch-copy {
		left: 10vw;
		margin-top: 10vw;
		font-size: 6vw;
	}
	.p-left {
		left: 10vw;
	}
</style>
