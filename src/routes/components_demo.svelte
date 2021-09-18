<script lang="ts">
	import { Input, SuggestableInput, SuggestableTagInput } from '$lib/components';
	let value = '';
	let tags: string[] = [];
</script>

<div class="m-2 p-4 shadow">
	<p>Input</p>
	<Input bind:value placeholder="test" class="m-2 w-full">
		<span slot="prefix"> This is prefix</span>
		<span slot="suffix">This is suffix</span>
	</Input>
	<p>{value}</p>
</div>

<div class="m-2 p-4 shadow">
	<p>SuggestableInput</p>
	<SuggestableInput
		bind:value
		placeholder="test"
		class="m-2 w-full"
		candidates={[
			'ハックツハッカソン プレシオ杯',
			'ハックツハッカソン スピノカップ',
			'サマーハッカソン'
		]}
	>
		<span slot="prefix"> This is prefix</span>
		<span slot="suffix">This is suffix</span>
	</SuggestableInput>
	<p>{value}</p>
</div>

<div class="m-2 p-4 shadow">
	<p>SuggestableTagInput</p>
	<SuggestableTagInput
		bind:value={tags}
		placeholder="test"
		class="m-2 w-full"
		candidates={['Go', 'TypeScript', 'Kubernetes', 'CSS', 'Docker', 'Rust', 'WebAssembly', 'C']}
		max={5}
	>
		<span slot="prefix"> This is prefix</span>
		<span slot="suffix">This is suffix</span>
	</SuggestableTagInput>
	<p>{tags.join(', ')}</p>
</div>
