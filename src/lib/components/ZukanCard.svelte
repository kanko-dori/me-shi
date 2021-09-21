<script lang="ts">
	export let name: string | undefined;
	export let icon: string | undefined;
	export let isOwn: boolean | undefined;
</script>

<div
	class="flex flex-col items-center p-8 {isOwn
		? ''
		: 'filter grayscale bg-gray-100'} {$$props.class}"
>
	<img src={icon} alt="{name}のアイコン" class="rounded-full" />
	<p class="pt-4">{name}</p>
</div>
