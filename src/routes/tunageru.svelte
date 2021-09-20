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
		<div class="continer rounded edit-bt bg-gray-800">
			<a
				href="/kaerareru"
				class="flex justify-center items-center outline-none focus:ring-2 w-full h-full"
			>
				<Pen16 class="h-3/5 w-3/5" style="fill:white" />
			</a>
		</div>
	</div>
</div>

<!--  -->
<style>
	.edit-possition {
		right: 15vw;
		margin-bottom: 5vw;
	}
	.edit-bt {
		height: 8vw;
		width: 8vw;
	}
</style>
