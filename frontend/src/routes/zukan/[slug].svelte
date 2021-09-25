<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { token } from '$lib/auth';
	import { Footer, Header, Loading, Modal, ZukanCard } from '$lib/components';
	import { getZukan } from '$lib/graphql/query/getZukan';
	import { user } from '$lib/store';
	import type { ZukanNamecard } from 'src/generated/graphql';

	type TeamMap = Record<string, ZukanNamecard[]>;

	let eventName = '';
	let teamMap: TeamMap = {};
	let processing = true;

	user.subscribe((u) => {
		if (u.type === 'failure') goto('/');
		return;
	});

	token.subscribe((s) => {
		if (s.type !== 'success') return;
		getZukan(
			{
				input: { eventId: $page.params['slug'] }
			},
			{
				Authorization: s.value ?? ''
			}
		)
			.then(({ getZukan }) => {
				console.log({ getZukan });
				eventName = getZukan.event.name ?? 'イベント';
				teamMap =
					getZukan.namecards?.reduce<TeamMap>((acc, card) => {
						const list = acc[card.team.name] ?? [];
						acc[card.team.name] = [...list, card];
						return acc;
					}, {}) ?? {};
			})
			.finally(() => {
				processing = false;
			});
	});
</script>

<Header />
<main class="container mx-auto px-4 max-w-screen-lg">
	<section class="flex px-4 py-8">
		<h1 class="text-4xl">{eventName}</h1>
		<div class="flex-grow" />
		<p class="text-sm lg:text-xl text-gray-500">
			{Object.values(teamMap)
				.flat()
				.filter((n) => n.isOwn).length}/
			{Object.values(teamMap).flat().length}
		</p>
	</section>
	<section class="px-4">
		<ul>
			{#each Object.entries(teamMap) as [teamName, cards] (teamName)}
				<li>
					<div class="flex">
						<h3 class="text-2xl">
							<span class="text-sm text-gray-500">team</span>
							{teamName}
						</h3>
						<div class="flex-grow" />
						<p class="text-sm lg:text-lg text-gray-500">
							{cards.filter((c) => c.isOwn).length}/{cards.length}
						</p>
					</div>
					<div class="p-4">
						<ul class="flex flex-wrap gap-4">
							{#each cards as card (card.id)}
								<li class="flex">
									{#if card.isOwn}
										<a href="/mirareru/{card.id}">
											<ZukanCard
												name={card.owner.name ?? ''}
												icon={card.owner.iconURL ?? '/favicon.png'}
												isOwn={card.isOwn ?? false}
												class="w-32 lg:w-48 hover:bg-gray-200 transform motion-safe:hover:-translate-y-1 motion-safe:hover:scale-110 transition ease-in-out duration-300"
											/>
										</a>
									{:else}
										<ZukanCard
											name={card.owner.name ?? ''}
											icon={card.owner.iconURL ?? '/favicon.png'}
											isOwn={card.isOwn ?? false}
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

<Modal open={processing}>
	<div class="z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
		<Loading />
	</div>
</Modal>
<Footer />
