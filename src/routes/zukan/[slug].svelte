<script lang="ts">
	import { getToken } from '$lib/auth';
	import { Header, Footer, ZukanCard } from '$lib/components';
	import { getZukan } from '$lib/graphql/query/getZukan';
	import { onMount } from 'svelte';
	import type { ZukanNamecard } from 'src/generated/graphql';
	const eventId = 'testEvent';
	let eventname = '';
	let namecardList: ZukanNamecard[] = [];
	let teamList: string[] = [];
	let team: string[] = [];

	onMount(() => {
		getToken().then((token) => {
			getZukan(
				{
					input: {
						eventId: eventId
					}
				},
				{ Authorization: token ?? '' }
			)
				.then((zukan) => {
					console.log(zukan);
					eventname = zukan.getZukan.event.name ?? '';
					teamList = zukan.getZukan.namecards?.map((a) => a.team.name) ?? [];
					namecardList = zukan.getZukan.namecards ?? [];

					team = Object.keys(
						teamList.reduce<Record<string, number>>((acc, val) => {
							acc[val] = (acc[val] ?? 0) + 1;
							return acc;
						}, {})
					);

					let test = namecardList.map((a) => {
						{
							a.team.name, a.owner.name;
						}
						return;
					});

					console.log(test);
				})
				.catch((err) => console.error(err));
		});
	});
</script>

<Header />
<main class="container mx-auto px-4 max-w-screen-lg">
	<section class="flex px-4 py-8">
		<h1 class="text-4xl">{eventname}</h1>
		<div class="flex-grow" />
		<p class="text-sm lg:text-xl text-gray-500">
			{namecardList.filter((n) => n.isOwn).length}/{namecardList.length}
		</p>
	</section>
	<section class="px-4">
		<ul>
			{#each team as teamname}
				<li>
					<div class="flex">
						<h3 class="text-2xl">
							<span class="text-sm text-gray-500">team</span>
							{teamname}
						</h3>
						<div class="flex-grow" />
						<p class="text-sm lg:text-lg text-gray-500">
							{namecardList.filter((n) => n.isOwn && n.team.name == teamname)
								.length}/{namecardList.filter((n) => n.team.name == teamname).length}
						</p>
					</div>
					<div class="p-4">
						<ul class="flex flex-wrap gap-4">
							{#each namecardList as n}
								<li class="flex">
									{#if n.team.name === teamname}
										<ZukanCard
											name={n.owner.name || undefined}
											icon={n.owner.iconURL || undefined}
											isOwn={n.isOwn || undefined}
											class="w-32 lg:w-48"
										/>
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				</li>
			{/each}
		</ul>
	</section>
</main>
<Footer />
