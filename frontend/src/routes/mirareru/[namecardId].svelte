<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';
	import { appsyncApiKey } from '$lib/env';

	export const load: Load = ({ fetch, page }) =>
		fetch('https://h6qrtrf4hrdl5pt5z2ojjomstq.appsync-api.ap-northeast-1.amazonaws.com/graphql', {
			headers: {
				'x-api-key': appsyncApiKey
			},
			body: JSON.stringify({
				query: /* GraphQL */ `
					query getNamecard($input: GetNamecardInput) {
						getNamecard(input: $input) {
							id
							memberOf
							preferTechnologies
							usedTechnologies
							event {
								id
								name
							}
							owner {
								id
								iconURL
								name
								twitterId
								githubId
							}
							team {
								id
								name
								event {
									id
									name
								}
								product {
									name
									description
									repository
									comments {
										id
										body
									}
								}
							}
						}
					}
				`,
				variables: { input: { namecardId: page.params['namecardId'] } }
			}),
			method: 'POST'
		})
			.then((res) => res.json())
			.then((r: { data: { getNamecard: Namecard } }) => r.data.getNamecard)
			.then((namecard) => ({ props: { namecard } }))
			.catch((e) => {
				console.error(e);
				return {};
			});
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { authUser, token } from '$lib/auth';
	import { Button, Footer, Header, Input } from '$lib/components';
	import Loading from '$lib/components/Loading.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { addComment, addNamecard, getNamecard } from '$lib/graphql/query';
	import { user } from '$lib/store';
	import { Dynamic, Static } from '$lib/svg';
	import { QrCode16, SendFilled32 } from 'carbon-icons-svelte';
	import type { Namecard } from 'src/generated/graphql';
	import { Book16 } from 'carbon-icons-svelte';
	import base64 from 'base-64';

	export let namecard: Namecard | undefined;

	const twitterShareUrl = new URL('https://twitter.com/share');
	twitterShareUrl.searchParams.append('url', `https://me-shi.ga${$page.path}`);
	twitterShareUrl.searchParams.append('text', `イベントに参加してきました！`);
	twitterShareUrl.searchParams.append('hashtags', 'me_shi');

	let namecardId = namecard?.id ?? '';
	let ownerId = namecard?.owner.id ?? '';
	let name = namecard?.owner.name ?? '';
	let github = namecard?.owner.githubId ?? '';
	let twitter = namecard?.owner.twitterId ?? undefined;
	let eventName = namecard?.event.name ?? '';
	let team = namecard?.team;
	let product = team?.product;
	let usedTechnologies = namecard?.usedTechnologies ?? [];
	let preferedTechnologies = namecard?.preferTechnologies ?? undefined;
	let memberOf = namecard?.memberOf ?? undefined;
	let comments = namecard?.team.product.comments ?? [];
	let eventId = namecard?.event.id;

	let comment = '';

	const urlSearchParam = new URLSearchParams();
	const ogImageUrl = new URL('https://me-shi.ga/png/dynamic');
	urlSearchParam.append('event', eventName);
	urlSearchParam.append('team', team?.name ?? 'event_name');
	urlSearchParam.append('product_name', product?.name ?? '');
	usedTechnologies.forEach((t) => {
		urlSearchParam.append('usedTechnology', t);
	});
	if (preferedTechnologies != undefined) {
		preferedTechnologies.forEach((t) => {
			urlSearchParam.append('preferedTechnology', t);
		});
	}
	if (memberOf != undefined) {
		urlSearchParam.append('memberOf', memberOf);
	}
	ogImageUrl.searchParams.append('b64', base64.encode(urlSearchParam.toString()));

	const send = () => {
		if ($token.type !== 'success') {
			console.log('Auth isnot initialized');
			return;
		}
		addComment(
			{
				input: {
					comment,
					teamId: team?.id ?? ''
				}
			},
			{ Authorization: $token.value ?? '' }
		)
			.then(({ addComment }) => {
				if (addComment.product.comments != null) comments = addComment.product.comments;
			})
			.finally(() => {
				comment = '';
			});
	};

	token.subscribe((t) => {
		if (t.type !== 'success') return;
		getNamecard(
			{
				input: {
					namecardId: $page.params.namecardId
				}
			},
			{ Authorization: t.value ?? '' }
		)
			.then(({ getNamecard }) => {
				const { owner, event, team: t, id } = getNamecard;
				namecardId = id;
				ownerId = owner.id;
				if (owner.name != null) name = owner.name;
				if (owner.githubId != null) github = owner.githubId;
				if (owner.twitterId != null) twitter = owner.twitterId;
				if (event.name != null) eventName = event.name;
				if (event.id != null) eventId = event.id;
				team = t;
				product = team.product;
				usedTechnologies = getNamecard.usedTechnologies ?? [];
				preferedTechnologies = getNamecard.preferTechnologies ?? undefined;
				if (t.product.comments != null) comments = t.product.comments;
				memberOf = getNamecard.memberOf ?? undefined;
			})
			.then(() => {
				if ($authUser.type !== 'success') return;
				if ($authUser.value?.sub === ownerId) {
					console.log('This card is mine. skip addNamecards...');
					return;
				}
				console.log('call addNamecard');
				addNamecard({ input: namecardId }, { Authorization: t.value ?? '' }).then((res) =>
					console.log('addNamecard done', res)
				);
			});
	});
</script>

<svelte:head>
	<title>{eventName}での{name}のme-shi</title>
	<meta property="og:url" content="https://me-shi.ga{$page.path}" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="me-shi" />
	<meta property="og:image" content={ogImageUrl.href} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<!-- https://me-shi.ga/png/dynamic?event=%E3%82%B9%E3%83%94%E3%83%8E%E3%82%AB%E3%83%83%E3%83%97&team=%E9%96%91%E5%8F%A4%E9%B3%A5&product_name=me-shi&usedTechnology=TypeScript&preferedTechnology=go&memberOf=%E8%B1%8A%E7%94%B0%E9%AB%98%E5%B0%82 -->
<Header />
<main class="container mx-auto px-4 max-w-3xl">
	<div class="flex flex-col gap-2 w-full mx-auto p-4">
		<div>
			<Static {name} {github} {twitter} class="w-full shadow-xl" />
		</div>
		<div class="relative">
			<Dynamic
				event={eventName}
				team={team?.name ?? ''}
				product={product ?? { name: '' }}
				{usedTechnologies}
				{preferedTechnologies}
				memberOf={memberOf ?? undefined}
				class="w-full shadow-xl"
			/>
			{#if $user.type === 'success' && $user.value.id === ownerId}
				<a
					href={twitterShareUrl.toString()}
					target="_blank"
					class="absolute flex justify-center items-center outline-none focus:ring-2 w-12 h-12 right-2 bottom-16"
				>
					<img src="/twitter.svg" alt="twitter" />
				</a>
				<a
					href="/wataseru/{namecardId}"
					class="absolute flex justify-center items-center outline-none focus:ring-2 w-12 h-12 rounded-md opacity-75 bg-gray-800 right-2 bottom-2"
				>
					<QrCode16 class="h-3/5 w-3/5" style="fill:white" />
				</a>
			{/if}
		</div>
		<a
			href="/zukan/{eventId}"
			class="group hover:bg-gray-100 transition outline-none focus:ring-2 w-full h-full flex p-2 items-center"
		>
			<p class="text-sm lg:text-lg">{eventName} の名刺図鑑をひらく</p>
			<div class="flex-grow" />
			<Book16 class="h-6 w-6 transition-transform duration-200 ease-out group-hover:scale-150" />
		</a>
	</div>

	<div class="mx-auto px-8 py-4">
		<p class="text-2xl p-2 border-b-2 border-gray-300">コメント</p>
		{#if $user.type === 'success' && $user.value.id !== ownerId}
			<div class="py-6">
				<form on:submit|preventDefault={send} class="flex gap-2">
					<Input bind:value={comment} placeholder="" class="flex w-full " required />
					<Button class="bg-blue-600 px-2 py-2 active:bg-blue-700 text-white">
						<SendFilled32 class="h-6 w-6" style="fill:white " />
					</Button>
				</form>
				<div class="text-xs lg:text-sm text-gray-500">
					<p>コメントはプロダクト単位、匿名で公開されます</p>
					<p>誹謗中傷は侮辱罪に該当する場合があります</p>
				</div>
			</div>
		{/if}

		<ul class="flex flex-col gap-6 mt-4">
			{#each [...comments].reverse() as comment}
				<li class="p-2">
					<span class="text-xl px-4 py-2 rounded shadow border border-gray-200">
						{comment.body}
					</span>
				</li>
			{/each}
		</ul>
	</div>
</main>

<Footer />
