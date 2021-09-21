<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import { token } from '$lib/auth';

	import { QRcode, Header, Footer } from '$lib/components';
	import { getNamecard } from '$lib/graphql/query';
	import { user } from '$lib/store';
	import { Dynamic } from '$lib/svg';

	let event = '';
	let team = '';
	let product = { name: '' };
	let usedTechnologies: Array<string> = [];
	let preferTechnologies: Array<string> = [];

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
		).then(({ getNamecard: namecard }) => {
			event = namecard.event.name ?? '';
			team = namecard.team.name ?? '';
			product = namecard.team.product ?? { name: '' };
			usedTechnologies = namecard.usedTechnologies ?? [];
			preferTechnologies = namecard.preferTechnologies ?? [];
		});
	});
</script>

<Header />
<main class="container max-w-screen-lg px-4 mx-auto">
	<div class="container mx-auto flex">
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
<Footer />
