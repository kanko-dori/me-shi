<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { token } from '$lib/auth';
	import { Footer, Header, Loading, Modal, QRcode } from '$lib/components';
	import { subscription } from '$lib/graphql';
	import { addNamecard, getNamecard } from '$lib/graphql/query';
	import { user } from '$lib/store';
	import { Dynamic } from '$lib/svg';
	import type { AddNamecardResult } from 'src/generated/graphql';

	let event = '';
	let team = '';
	let product = { name: '' };
	let usedTechnologies: Array<string> = [];
	let preferTechnologies: Array<string> = [];

	let showOnAddNamecardModal = false;
	let loading = true;
	user.subscribe((u) => {
		if (u.type === 'failure') goto('/');
		return;
	});

	token.subscribe((t) => {
		if (t.type !== 'success') return;
		getNamecard(
			{
				input: {
					namecardId: $page.params.namecardId
				}
			},
			{
				Authorization: t.value ?? ''
			}
		)
			.then(({ getNamecard: namecard }) => {
				event = namecard.event.name ?? '';
				team = namecard.team.name ?? '';
				product = namecard.team.product ?? { name: '' };
				usedTechnologies = namecard.usedTechnologies ?? [];
				preferTechnologies = namecard.preferTechnologies ?? [];
			})
			.then(() => {
				console.log('try subscribe onAddNamecard...');
				subscription(
					`
						subscription OnAddNameListener($input: String!) {
							onAddNamecard(ownerNamecardId: $input) {
								getterNamecardId
								ownerNamecardId
							}
						}
					`,
					{
						input: $page.params.namecardId
					},
					{
						Authorization: t.value ?? ''
					}
				).subscribe(
					(res: any) => {
						const onAddNamecard = res.value.data as AddNamecardResult;
						console.log('addNamecard was called with: ', onAddNamecard);
						addNamecard(
							{ input: onAddNamecard.getterNamecardId ?? '' },
							{ Authorization: t.value ?? '' }
						).then(() => {
							console.log('addNamecard done.');
						});
					},
					console.warn,
					console.log
				);
				loading = false;
			});
	});
</script>

<Header />
<main class="container max-w-screen-lg px-4 mx-auto">
	<div class="container mx-auto flex">
		{#if !loading}
			<QRcode
				content="https://me-shi.ga/mirareru/{$page.params.namecardId}"
				class="w-2/5 h-2/5 mx-auto shadow-xl"
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
		{/if}
	</div>
	<p class="p-8 shadow-xl">
		<Dynamic
			{event}
			{team}
			{product}
			{usedTechnologies}
			preferedTechnologies={preferTechnologies}
			class="max-w-3xl mx-auto"
		/>
	</p>
</main>

<Modal open={showOnAddNamecardModal}>
	<div
		class="max-w-4xl p-8 bg-white rounded-md shadow-md z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
	>
		<h3 class="py-4">名刺の交換が完了しました！</h3>
		<h3 class="py-4">交換した名刺を見に行ってみましょう！</h3>

		<div class="flex">
			<div class="flex-grow" />
			<button
				class="bg-blue-500 rounded text-white py-2 px-4"
				on:click={() => {
					// goto('/tsunageru');
					showOnAddNamecardModal = false;
				}}
			>
				OK
			</button>
		</div>
	</div>
</Modal>
<Modal open={loading}>
	<div class="z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
		<Loading />
	</div>
</Modal>

<Footer />
