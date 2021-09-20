<script lang="ts">
	import {
		Button,
		Footer,
		Header,
		Input,
		SuggestableInput,
		SuggestableTagInput
	} from '$lib/components';
	import Event16 from 'carbon-icons-svelte/lib/Event16';
	import Search16 from 'carbon-icons-svelte/lib/Search16';
	import Tag16 from 'carbon-icons-svelte/lib/Tag16';
	let value = '';
	let event = '';
	let tags: string[] = [];
</script>

<Header />

<Header showSignOut={true} />

<div class="container mx-auto">
	<div class="m-4 p-8 rounded-lg bg-pink-200">
		<p>Input</p>
		<Input bind:value placeholder="test" class="m-2 w-full">
			<span slot="suffix" class="inline-flex items-center px-1">
				<Search16 class="cursor-pointer" on:click={() => alert('Searching...')} />
			</span>
		</Input>
		<p>{value}</p>
	</div>

	<div class="m-4 p-8 rounded-lg bg-blue-200">
		<p>SuggestableInput</p>
		<SuggestableInput
			bind:value={event}
			placeholder="test"
			class="m-2 w-full"
			candidates={[
				'ハックツハッカソン プレシオ杯',
				'ハックツハッカソン スピノカップ',
				'サマーハッカソン'
			]}
		>
			<span slot="prefix" class="inline-flex items-center px-1">
				<Event16 />
			</span>
		</SuggestableInput>
		<p>{event}</p>
	</div>

	<div class="m-4 p-8 rounded-lg bg-purple-200">
		<p>SuggestableTagInput</p>
		<SuggestableTagInput
			bind:value={tags}
			placeholder="test"
			class="m-2 w-full"
			candidates={['Go', 'TypeScript', 'Kubernetes', 'CSS', 'Docker', 'Rust', 'WebAssembly', 'C']}
			max={5}
		>
			<span slot="prefix" class="inline-flex items-center px-1">
				<Tag16 />
			</span>
		</SuggestableTagInput>
		<p>{tags.join(', ')}</p>
	</div>

	<div class="flex px-8">
		<Button class="bg-gray-300">Cancel</Button>
		<div class="flex-grow" />
		<Button class="bg-blue-600 text-white">Apply</Button>
	</div>
</div>

<Footer />
