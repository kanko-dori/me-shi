<script lang="ts">
	import { getToken } from '$lib/auth';
	import {} from '$lib/store';
	import { Header, Footer, ZukanCard } from '$lib/components';
	import { getZukan } from '$lib/graphql/query/getZukan';
	import { onMount } from 'svelte';
	import type { GetZukanInput, Zukan, ZukanNamecard } from 'src/generated/graphql';
	const eventId = 'testEvent';
	let teamnameList: string[] = [];

	let teamNum: number | undefined;

	let eventname = '';
	let teamname = '';

	let namecardList: ZukanNamecard[] = [];

	onMount(() => {
		getToken()
			.then((token) =>
				getZukan(
					{
						input: {
							eventId: eventId
						}
					},
					{ Authorization: token ?? '' }
				)
			)
			.then((zukan) => {
				console.log(zukan);
				eventname = zukan.getZukan.event.name ?? '';
				teamNum = zukan.getZukan.namecards?.length ?? undefined;
				namecardList = zukan.getZukan.namecards ?? [];

				console.log(namecardList);
			})
			.catch((err) => console.error(err));
	});
</script>

<Header />
<main class="container mx-auto px-4 max-w-screen-lg">
	<section class="flex px-4 py-8">
		<h1 class="text-4xl">{eventname}</h1>
		<div class="flex-grow" />
		<p class="text-sm text-gray-500">5/40</p>
	</section>
	<section class="px-4">
		<div>
			<div class="flex">
				<h3 class="text-2xl">
					<span class="text-sm text-gray-500">team</span>
					{teamname}
				</h3>
				<div class="flex-grow" />
				<p class="text-sm text-gray-500">1/3</p>
			</div>
			<div class="flex gap-4">
				<ul>
					{#each namecardList as n}
						<li>
							<ZukanCard
								name={n.owner.name || undefined}
								icon={n.owner.iconURL || undefined}
								isOwn={n.isOwn || undefined}
								class="w-48"
							/>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>
</main>
<Footer />
