<script>
	import Header from '$lib/components/Header.svelte';
	import { Static } from '$lib/svg';
	import { Pen32 } from 'carbon-icons-svelte';
</script>

<Header />
<div class="container mx-auto relative">
	<div class="aspect-w-2 aspect-h-1 w-3/4 mx-auto ">
		<Static name="閑古鳥" github="kanko-dori" />
	</div>
	<div class="absolute pen bottom-0">
		<div class="rounded edit-bt bg-gray-800 relative">
			<svg class="absolute fill-current text-white"><Pen32 /></svg>
		</div>
	</div>
</div>

<style>
	.edit-bt {
		height: 8vw;
		width: 8vw;
	}
	.pen {
		right: 15vw;
		margin-bottom: 5vw;
	}
</style>
