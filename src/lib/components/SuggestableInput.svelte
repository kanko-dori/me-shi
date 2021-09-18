<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { InputEvent, SvelteFocusEvent } from './types';
	export let value: string | undefined = undefined;
	export let placeholder: string = '';
	export let candidates: string[] = [];

	export let candidatesListClass = '';
	export let candidatesItemClass = '';

	type CustomEvent = {
		input: InputEvent;
		focus: SvelteFocusEvent;
		blur: SvelteFocusEvent;
	};

	let inputFocus = false;
	let buttonFocus = false;

	let computedValue: string | number = '';
	$: computedValue = value ?? '';

	let selectableCandidates = candidates;
	$: selectableCandidates = [...new Set(candidates.map((c) => c.trim()))].filter((candidate) =>
		candidate.toLowerCase().includes(value?.trim()?.toLowerCase() ?? '')
	);

	const dispatcher = createEventDispatcher<CustomEvent>();

	const handleInput = (ev: InputEvent) => {
		value = ev.currentTarget.value;
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
	<input
		class="focus:outline-none flex-grow"
		value={computedValue}
		{placeholder}
		on:input={handleInput}
		on:focus={handleFocus}
		on:blur={handleBlur}
		on:change
		on:keydown
		on:keypress
		on:keyup
	/>
	<slot name="suffix" />
</span>

{#if (inputFocus || buttonFocus) && value !== ''}
	<ul class="block absolute mx-2 bg-white shadow-md -mt-2 z-10 {candidatesListClass}">
		{#each selectableCandidates as candidate (candidate)}
			<li>
				<button
					class="block w-full p-2 px-4 text-left {candidatesItemClass}"
					on:click={() => {
						value = candidate;
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
