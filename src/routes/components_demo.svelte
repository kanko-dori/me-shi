<script lang="ts">
	import {
		Button,
		Footer,
		Header,
		Input,
		QRcode,
		SuggestableInput,
		SuggestableTagInput,
		ZukanCard
	} from '$lib/components';
	import Modal from '$lib/components/Modal.svelte';
	import Event16 from 'carbon-icons-svelte/lib/Event16';
	import Search16 from 'carbon-icons-svelte/lib/Search16';
	import Tag16 from 'carbon-icons-svelte/lib/Tag16';
	let value = '';
	let event = '';
	let tags: string[] = [];

	let appliedModal = false;
	let cancelModal = false;
</script>

<Header />

<Header showSignOut={true} />

<div class="container mx-auto flex">
	<QRcode content="This is sample text." class="w-2/5 h-2/5" />
	<QRcode
		content="This is sample text."
		class="w-2/5 h-2/5"
		color={[
			{
				color: '#3b82f6',
				offset: 0
			},
			{
				color: '#34d399',
				offset: 100
			}
		]}
	/>
</div>

<div class="container mx-auto flex">
	<ZukanCard name="octocat" icon="https://github.com/octocat.png" isOwn={true} class="w-48" />
	<ZukanCard name="octocat" icon="https://github.com/octocat.png" isOwn={false} class="w-48" />
</div>

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
		<Button class="bg-gray-300" on:click={() => (cancelModal = true)}>Cancel</Button>
		<div class="flex-grow" />
		<Button class="bg-blue-600 text-white" on:click={() => (appliedModal = true)}>Apply</Button>
	</div>
</div>

<Modal open={appliedModal} on:outsideclick={() => (appliedModal = false)}>
	<div
		class="max-w-8xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-10"
	>
		<h3 class="text-2xl">Complete process!</h3>
		<div class="flex">
			<div class="flex-grow" />
			<button class="px-4 py-2 bg-gray-700 text-white" on:click={() => (appliedModal = false)}>
				close
			</button>
		</div>
	</div>
</Modal>
<Modal open={cancelModal} on:outsideclick={() => console.log('ignore')}>
	<div
		class="max-w-8xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-10"
	>
		<h3 class="text-2xl">Are you OK?</h3>
		<div class="flex">
			<button class="px-4 py-2 bg-gray-700 text-white" on:click={() => (cancelModal = false)}>
				No
			</button>
			<div class="flex-grow" />
			<button class="px-4 py-2 bg-gray-700 text-white" on:click={() => (cancelModal = false)}>
				Yes
			</button>
		</div>
	</div>
</Modal>

<Footer />
