<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { InputEvent, SvelteFocusEvent } from './types';
	import Close16 from 'carbon-icons-svelte/lib/Close16';
	export let value: string[] = [];
	export let placeholder: string = '';
	export let candidates: string[] = [];
	/**
	 * max tag num. if 0, no limit.
	 */
	export let max = 0;

	export let candidatesListClass = '';
	export let candidatesItemClass = '';

	const addValues = (...values: string[]) => {
		value = [...new Set([...value, ...values.filter((v) => v !== '')])].slice(0, max || undefined);
	};

	type CustomEvent = {
		input: InputEvent;
		focus: SvelteFocusEvent;
		blur: SvelteFocusEvent;
	};

	let currentInput = '';

	let inputFocus = false;
	let buttonFocus = false;

	let selectableCandidates = candidates;
	$: selectableCandidates = [...new Set(candidates.map((c) => c.trim()))].filter((candidate) =>
		candidate.toLowerCase().includes(currentInput?.trim()?.toLowerCase() ?? '')
	);

	const dispatcher = createEventDispatcher<CustomEvent>();

	const handleInput = (ev: InputEvent) => {
		const input = ev.currentTarget.value;
		const inputTags = input.split(/(?:,|\s)/g).map((t) => t.trim());
		const last = inputTags.pop();
		if (inputTags.length > 0) addValues(...inputTags);
		if (last !== undefined) currentInput = last;
		dispatcher('input', ev);
	};
	const handleFocus = (ev: SvelteFocusEvent) => {
		inputFocus = true;
		dispatcher('focus', ev);
	};
	const handleBlur = async (ev: SvelteFocusEvent) => {
		dispatcher('blur', ev);
		setTimeout(() => (inputFocus = false), 200);
	};
</script>

<span class="p-2 rounded shadow focus-within:ring inline-flex relative bg-white {$$props.class}">
	<slot name="prefix" />
	<div class="inline-flex flex-wrap flex-grow">
		{#each value as tag}
			<span class="bg-gray-300 px-2 rounded mr-1">
				{tag}
				<Close16
					class="inline cursor-pointer"
					style="width: 1em; height: 1em"
					title="Remove {tag}"
					on:click={() => (value = [...value.filter((v) => v !== tag)])}
				/>
			</span>
		{/each}
		<input
			class="focus:outline-none flex-grow"
			value={currentInput}
			{placeholder}
			readonly={max > 0 && value.length >= max}
			on:input={handleInput}
			on:focus={handleFocus}
			on:blur={handleBlur}
			on:change
			on:keydown
			on:keypress
			on:keyup
		/>
	</div>
	<slot name="suffix" />
</span>

{#if (inputFocus || buttonFocus) && currentInput !== ''}
	<ul class="block absolute mx-2 bg-white shadow-md -mt-2 z-10{candidatesListClass}">
		{#each selectableCandidates as candidate (candidate)}
			<li>
				<button
					class="block w-full p-2 px-4 text-left {candidatesItemClass}"
					on:click={() => {
						if (!value.includes(candidate)) addValues(candidate);
						currentInput = '';
						buttonFocus = false;
					}}
					on:mouseenter={() => (buttonFocus = true)}
					on:mouseleave={() => (buttonFocus = false)}
				>
					{candidate}
				</button>
			</li>
		{/each}
	</ul>
{/if}
