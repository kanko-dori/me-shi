<script>
	import { Header, Footer, Input, Button } from '$lib/components';
	import { Dynamic, Static } from '$lib/svg';
	import { QrCode16, SendFilled32 } from 'carbon-icons-svelte';

	// 借値
	let name = 'name';
	let github = 'githubID';
	let twitter = 'twitterID';
	let event = 'ハックツハッカソン';
	let team = '閑古鳥';
	let product = { name: 'kubesmas' };
	let usedTechnologies = ['kubernetes', 'html'];
	let comment = '';
	function send() {}
	let coments = ['いいね', 'さいこー'];
</script>

<Header />
<div class="container max-w-screen-xl mx-auto px-4">
	<div class="mx-auto aspect-w-3 aspect-h-1 m-2">
		<Static {name} {github} {twitter} class="w-3/5 mx-auto border-gray-300 border-2" />
	</div>

	<div class="relative mx-auto aspect-w-3 aspect-h-1">
		<Dynamic
			{event}
			{team}
			{product}
			{usedTechnologies}
			class="w-3/5 mx-auto border-gray-300 border-2"
		/>
	</div>
	<div class="relative w-4/5">
		<div class="absolute bottom-0 right-0 rounded edit-bt m-2 opacity-75 bg-gray-800">
			<a
				href="/kaerareru"
				class="flex justify-center items-center outline-none focus:ring-2 w-full h-full"
			>
				<QrCode16 class="h-3/5 w-3/5" style="fill:white" />
			</a>
		</div>
	</div>

	<div class="mx-auto px-8">
		<p class="t-size">コメント</p>
		<div class="border-gray-400 border mb-6" />
		<div class="flex">
			<Input bind:value={comment} placeholder="" class="w-full mr-2" />
			<Button class="bg-blue-600" on:click={send}>
				<SendFilled32 class="h-5 w-5" style="fill:white" />
			</Button>
		</div>
		<div class="opacity-75">
			<p>コメントはプロダクト単位、匿名で公開されます</p>
			<p>誹謗中傷は侮辱罪に該当する場合があります</p>
		</div>
		<ul>
			{#each coments as comment}
				<li>
					<p class="t-size m-4">{comment}</p>
				</li>
			{/each}
		</ul>
	</div>
</div>

<Footer />

<style>
	.edit-bt {
		height: 6vw;
		width: 6vw;
	}
	.t-size {
		font-size: 3vw;
	}
</style>
