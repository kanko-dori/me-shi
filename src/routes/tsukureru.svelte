<script lang="ts">
	import {
		Header,
		Footer,
		Input,
		SuggestableInput,
		SuggestableTagInput,
		Button
	} from '$lib/components';
	import { Dynamic } from '$lib/svg';

	let event = '';
	let team = '';
	let product = { name: '' };
	let usedTechnologies: string[] | undefined = [];
	let preferedTechnologies: string[] | undefined = undefined;
	let memberOf = '';

	let technology = ['Go', 'TypeScript', 'Kubernetes', 'CSS', 'Docker', 'Rust', 'WebAssembly', 'C'];

	const onSubmit = () => {
		console.log('submitted', {
			event,
			team,
			product,
			usedTechnologies,
			preferedTechnologies,
			memberOf
		});
	};
</script>

<Header />
<main class="container mx-auto max-w-screen-lg px-4">
	<div class="p-8">
		<div class="max-w-3xl w-full mx-auto">
			<Dynamic
				{event}
				{team}
				{product}
				usedTechnologies={usedTechnologies || []}
				preferedTechnologies={preferedTechnologies || undefined}
				memberOf={memberOf || undefined}
				class="w-full shadow-xl"
			/>
		</div>
	</div>
	<form class="block p-4 max-w-2xl mx-auto" on:submit|preventDefault={onSubmit}>
		<div class="p-4">
			<p class="text-sm text-gray-500">ハッカソン名</p>
			<SuggestableInput
				class="w-full"
				candidates={[
					'ハックツハッカソン プレシオ杯',
					'ハックツハッカソン スピノカップ',
					'サマーハッカソン'
				]}
				bind:value={event}
			/>
		</div>
		<div class="p-4">
			<p class="text-sm text-gray-500">チーム名</p>
			<Input class="w-full" bind:value={team} />
		</div>
		<div class="p-4">
			<p class="text-sm text-gray-500">作品名</p>
			<Input class="w-full" bind:value={product.name} />
		</div>
		<div class="p-4">
			<p class="text-sm text-gray-500">今回使った技術</p>
			<SuggestableTagInput class="w-full" candidates={technology} bind:value={usedTechnologies} />
		</div>
		<div class="p-4">
			<p class="text-sm text-gray-500">いつも使ってる技術</p>
			<SuggestableTagInput
				class="w-full"
				candidates={technology}
				bind:value={preferedTechnologies}
			/>
		</div>
		<div class="p-4">
			<p class="text-sm text-gray-500">所属</p>
			<Input class="w-full" bind:value={memberOf} />
		</div>
		<div class="p-4 flex">
			<Button class="hover:shadow transition-shadow bg-gray-300">Cancel</Button>
			<div class="flex-grow" />
			<Button class="hover:shadow transition-shadow bg-blue-500 text-white">Apply</Button>
		</div>
	</form>
</main>
<Footer />
