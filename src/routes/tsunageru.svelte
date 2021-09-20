<script>
	import Header from '$lib/components/Header.svelte';
	import { Static } from '$lib/svg';
	import { Pen16 } from 'carbon-icons-svelte';
</script>

<Header />
<div class="container mx-auto relative">
	<div class="aspect-w-2 aspect-h-1 w-3/4 mx-auto ">
		<Static name="閑古鳥" github="kanko-dori" />
	</div>
	<div class="absolute edit-possition bottom-0 ">
		<div class="continer rounded edit-bt opacity-75 bg-gray-800">
			<a
				href="/kaerareru"
				class="flex justify-center items-center outline-none focus:ring-2 w-full h-full"
			>
				<Pen16 class="h-3/5 w-3/5" style="fill:white" />
			</a>
		</div>
	</div>
</div>
<div class="m-4 p-8 bg-gray-200">
	<p>参加したイベントの名刺</p>
	<div class="border-gray-500 border-2" />
	<div class="mt-1 w-full ">
		<a
			href="/event"
			class="flex justify-center items-center outline-none focus:ring-2 w-full h-full"
		>
			<p>新しくイベントの名刺を作る+</p>
		</a>
	</div>

	<p>イベント名→</p>
</div>

<div class="m-4 p-8 bg-gray-200">
	<p>いままでにもらった名刺</p>
	<div class="border-gray-500 border-2" />
	<div class="mt-1 w-full ">
		<a
			href="/event"
			class="flex justify-center items-center outline-none focus:ring-2 w-full h-full"
		>
			<p>新しくイベントの名刺を作る+</p>
		</a>
	</div>

	<p>イベント名→</p>
</div>
<div class="">
	<p>いままでにもらった名刺</p>
	<p>onsd</p>
	<p>→</p>
</div>

<style>
	.edit-possition {
		right: 15vw;
		bottom: 5vw;
	}
	.edit-bt {
		height: 6vw;
		width: 6vw;
	}
</style>
