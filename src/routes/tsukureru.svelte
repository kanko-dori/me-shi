<script lang="ts">
	import type { Product, Team } from 'src/generated/graphql';
	import { getToken } from '$lib/auth';
	import {
		Header,
		Footer,
		Input,
		SuggestableInput,
		SuggestableTagInput,
		Button
	} from '$lib/components';
	import { listAffiliation, listEvent, listTeamAll, listTechnology } from '$lib/graphql/query';
	import { Dynamic } from '$lib/svg';
	import { onMount } from 'svelte';
	import Tag16 from 'carbon-icons-svelte/lib/Tag16';
	import Event16 from 'carbon-icons-svelte/lib/Event16';

	let event: string = '';
	let team: string = '';
	let product: Product = { name: '' };
	let usedTechnologies: string[] | undefined = [];
	let preferedTechnologies: string[] | undefined = undefined;
	let memberOf = '';

	let eventList: string[] = [];
	let teamList: Team[] = [];
	let showTeamNameList: string[] = [];
	let technologyList: string[] = [];
	let affiliationList: string[] = [];

	onMount(() => {
		getToken()
			.then((token) =>
				Promise.all([
					listEvent(undefined, { Authorization: token ?? '' }),
					listTeamAll(undefined, { Authorization: token ?? '' }),
					listTechnology(undefined, { Authorization: token ?? '' }),
					listAffiliation(undefined, { Authorization: token ?? '' })
				])
			)
			.then(([event, team, technologies, affiliations]) => {
				console.log('fetch done.');
				eventList = event.listEvent.map((e) => e.id);
				teamList = team.listTeamAll;
				technologyList = technologies.listTechnology.map((t) => t.name);
				console.log(technologies);
				affiliationList = affiliations.listAffiliation.map((a) => a.id);
			})
			.catch(console.error);
	});

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

	$: showTeamNameList = teamList.map((t) => (t.event.name === event ? t.name : ''));
	$: product = teamList.find((t) => t.name === team)?.product ?? { name: '' };
</script>

<Header />
<main class="container mx-auto max-w-screen-lg px-4">
	<div class="p-8">
		<div class="max-w-3xl w-full mx-auto">
			<Dynamic
				{event}
				{team}
				{product}
				usedTechnologies={usedTechnologies || undefined}
				preferedTechnologies={preferedTechnologies || undefined}
				memberOf={memberOf || undefined}
				class="w-full shadow-xl"
			/>
		</div>
	</div>
	<div class="block p-4 max-w-2xl mx-auto">
		<div class="p-4">
			<p class="text-sm text-gray-500">ハッカソン名</p>
			<SuggestableInput class="w-full" candidates={eventList} bind:value={event} />
		</div>
		<div class="p-4">
			<p class="text-sm text-gray-500">チーム名</p>
			<SuggestableInput class="w-full" candidates={showTeamNameList} bind:value={team} />
		</div>
		<div class="p-4">
			<p class="text-sm text-gray-500">作品名</p>
			<Input class="w-full" bind:value={product.name} />
		</div>
		<div class="p-4">
			<p class="text-sm text-gray-500">今回使った技術</p>
			<SuggestableTagInput class="w-full" candidates={technologyList} bind:value={usedTechnologies}>
				<span slot="prefix" class="inline-flex items-center px-1">
					<Tag16 />
				</span>
			</SuggestableTagInput>
		</div>
		<div class="p-4">
			<p class="text-sm text-gray-500">いつも使ってる技術</p>
			<SuggestableTagInput
				class="w-full"
				candidates={technologyList}
				bind:value={preferedTechnologies}
			>
				<span slot="prefix" class="inline-flex items-center px-1">
					<Tag16 />
				</span>
			</SuggestableTagInput>
		</div>
		<div class="p-4">
			<p class="text-sm text-gray-500">所属</p>
			<SuggestableInput class="w-full" candidates={affiliationList} bind:value={memberOf}>
				<span slot="prefix" class="inline-flex items-center px-1">
					<Event16 />
				</span>
			</SuggestableInput>
		</div>
		<div class="p-4 flex">
			<Button class="hover:shadow transition-shadow bg-gray-300">Cancel</Button>
			<div class="flex-grow" />
			<Button class="hover:shadow transition-shadow bg-blue-500 text-white" on:click={onSubmit}>
				Apply
			</Button>
		</div>
	</div>
</main>
<Footer />
