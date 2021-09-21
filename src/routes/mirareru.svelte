<script lang="ts">
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
	let preferendTechnologies = ['graphQL'];
	let memberOf = 'friend name';
	let comment = '';
	const send = () => {
		console.log('send!');
	};
	let coments = ['いいね', 'さいこー'];
</script>

<Header showSignOut={true} />
<main class="container mx-auto px-4 max-w-3xl">
	<div class="flex flex-col gap-2 w-full mx-auto p-4">
		<div>
			<Static {name} {github} twitter={twitter || undefined} class="w-full shadow-xl" />
		</div>
		<div class="relative">
			<Dynamic
				{event}
				{team}
				{product}
				{usedTechnologies}
				preferedTechnologies={preferendTechnologies || undefined}
				memberOf={memberOf || undefined}
				class="w-full shadow-xl"
			/>
			<a
				href="/wataseru/${'slug'}"
				class="absolute flex justify-center items-center outline-none focus:ring-2 w-12 h-12 rounded-md opacity-75 bg-gray-800 right-2 bottom-2"
			>
				<QrCode16 class="h-3/5 w-3/5" style="fill:white" />
			</a>
		</div>
	</div>

	<div class="mx-auto px-8 py-4">
		<p class="text-2xl p-2 border-b-2 border-gray-300">コメント</p>
		<div class="py-6">
			<div class="flex gap-2">
				<Input bind:value={comment} placeholder="" class="flex-grow" />
				<Button class="bg-blue-600 px-2 py-2" on:click={send}>
					<SendFilled32 class="h-6 w-6" style="fill:white " />
				</Button>
			</div>
			<div class="text-xs lg:text-sm text-gray-500">
				<p>コメントはプロダクト単位、匿名で公開されます</p>
				<p>誹謗中傷は侮辱罪に該当する場合があります</p>
			</div>
		</div>

		<ul class="flex flex-col gap-6">
			{#each coments as comment}
				<li class="p-2">
					<span class="text-xl px-4 py-2 rounded shadow border border-gray-200">{comment}</span>
				</li>
			{/each}
		</ul>
	</div>
</main>

<Footer />
