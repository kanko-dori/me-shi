<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { InputEvent } from './types';
	export let type = 'text';
	export let value: string | number | null | undefined = undefined;
	export let placeholder = '';

	type CustomEvent = {
		input: InputEvent;
	};

	let computedType = type;
	$: computedType = type || computedType;

	let computedValue: string | number = '';
	$: computedValue = value ?? '';

	const dispatcher = createEventDispatcher<CustomEvent>();

	const handleInput = (ev: InputEvent) => {
		value = ev.currentTarget.value;
		dispatcher('input', ev);
	};
</script>

<span class="p-2 rounded shadow focus-within:ring inline-flex bg-white {$$props.class}">
	<slot name="prefix" />
	<input
		class="focus:outline-none flex-grow"
		type={computedType}
		value={computedValue}
		{placeholder}
		on:input={handleInput}
		on:blur
		on:change
		on:focus
		on:keydown
		on:keypress
		on:keyup
	/>
	<slot name="suffix" />
</span>
