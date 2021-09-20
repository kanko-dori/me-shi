<script>
	import { Header, Footer, Input, Button } from '$lib/components';
	import { Dynamic, Static } from '$lib/svg';
	import { QrCode16 } from 'carbon-icons-svelte';
	import CaretRightGlyph from 'carbon-icons-svelte/lib/CaretRightGlyph';

	// 借値
	let name = 'name';
	let github = 'githubID';
	let twitter = 'twitterID';
	let event = 'ハックツハッカソン';
	let team = '閑古鳥';
	let product = { name: 'kubesmas' };
	let usedTechnologies = ['kubanetes', 'html'];
	let comment = '';
	function send() {}
</script>

<Header />

<div class="container mx-auto flex w-3/4 aspect-w-2 aspect-h-1">
	<Static {name} {github} {twitter} />
</div>

<div class="container mx-auto relative">
	<div class="aspect-w-2 aspect-h-1 w-3/4 mx-auto">
		<Dynamic {event} {team} {product} {usedTechnologies} />
	</div>
	<div class="absolute edit-possition bottom-0 ">
		<div class="rounded edit-bt opacity-75 bg-gray-800">
			<a
				href="/kaerareru"
				class="flex justify-center items-center outline-none focus:ring-2 w-full h-full"
			>
				<QrCode16 class="h-3/5 w-3/5" style="fill:white" />
			</a>
		</div>
	</div>
</div>

<div class="container mx-auto px-8">
	<p class="t-size">コメント</p>
	<div class="border-gray-400 border mb-6" />
	<div class="flex">
		<Input bind:value={comment} placeholder="" class="w-full" />
		<div class="flex-grow" />
		<Button class="bg-blue-600" on:click={send}>
			<CaretRightGlyph class="h-5 w-5" style="fill:white" />
		</Button>
	</div>
</div>

<Footer />

<style>
	.edit-possition {
		right: 15vw;
		bottom: 5vw;
	}
	.edit-bt {
		height: 6vw;
		width: 6vw;
	}
	.t-size {
		font-size: 3vw;
	}
</style>
