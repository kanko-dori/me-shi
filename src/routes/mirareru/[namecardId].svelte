<script lang="ts">
	import { page } from '$app/stores';
	import { token } from '$lib/auth';
	import { Button, Footer, Header, Input } from '$lib/components';
	import { addComment } from '$lib/graphql/query/addComment';
	import { getNamecard } from '$lib/graphql/query/getNamecard';
	import { user } from '$lib/store';
	import { Dynamic, Static } from '$lib/svg';
	import { QrCode16, SendFilled32 } from 'carbon-icons-svelte';
	import type { Comment, Product, Team } from 'src/generated/graphql';

	let ownerId = '';
	let name = '';
	let github = '';
	let twitter: string | undefined;
	let eventName = '';
	let team: Team | undefined;
	let product: Product | undefined;
	let usedTechnologies: string[] = [];
	let preferedTechnologies: string[] | undefined = undefined;
	let memberOf: string | undefined = undefined;
	let comments: Array<Comment> = [];

	let comment = '';
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
		).then(({ getNamecard }) => {
			const { owner, event, team: t } = getNamecard;
			ownerId = owner.id;
			if (owner.name != null) name = owner.name;
			if (owner.githubId != null) github = owner.githubId;
			if (owner.twitterId != null) twitter = owner.twitterId;
			if (event.name != null) eventName = event.name;
			team = t;
			product = team.product;
			usedTechnologies = getNamecard.usedTechnologies ?? [];
			preferedTechnologies = getNamecard.preferTechnologies ?? undefined;
			if (t.product.comments != null) comments = t.product.comments;
			memberOf = getNamecard.memberOf ?? undefined;
		});
	});
</script>

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
					href="/wataseru/${'slug'}"
					class="absolute flex justify-center items-center outline-none focus:ring-2 w-12 h-12 rounded-md opacity-75 bg-gray-800 right-2 bottom-2"
				>
					<QrCode16 class="h-3/5 w-3/5" style="fill:white" />
				</a>
			{/if}
		</div>
	</div>

	<div class="mx-auto px-8 py-4">
		<p class="text-2xl p-2 border-b-2 border-gray-300">コメント</p>
		{#if $user.type === 'success' && $user.value.id !== ownerId}
			<div class="py-6">
				<form on:submit|preventDefault={send} class="flex gap-2">
					<Input bind:value={comment} placeholder="" class="flex-grow" required />
					<Button class="bg-blue-600 px-2 py-2">
						<SendFilled32 class="h-6 w-6" style="fill:white " />
					</Button>
				</form>
				<div class="text-xs lg:text-sm text-gray-500">
					<p>コメントはプロダクト単位、匿名で公開されます</p>
					<p>誹謗中傷は侮辱罪に該当する場合があります</p>
				</div>
			</div>
		{/if}

		<ul class="flex flex-col gap-6">
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
