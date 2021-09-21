<script lang="ts">
	import { page } from '$app/stores';
	import { token } from '$lib/auth';
	import { Button, Footer, Header, Input } from '$lib/components';
	import { getNamecard } from '$lib/graphql/query/getNamecard';
	import { user } from '$lib/store';
	import { Dynamic, Static } from '$lib/svg';
	import { QrCode16, SendFilled32 } from 'carbon-icons-svelte';
	import type { Namecard } from 'src/generated/graphql';

	let namecardPromise: Promise<Namecard> = Promise.resolve({
		event: {
			id: '',
			name: ''
		},
		id: '',
		owner: {
			id: ''
		},
		team: {
			id: '',
			name: '',
			event: {
				id: '',
				name: ''
			},
			product: {
				name: ''
			}
		}
	});
	let comment = '';
	const send = () => {
		console.log('send!');
	};

	token.subscribe((t) => {
		if (t.type !== 'success') return;
		namecardPromise = getNamecard(
			{
				input: {
					namecardId: $page.params.namecardId
				}
			},
			{ Authorization: t.value ?? '' }
		).then(({ getNamecard }) => getNamecard);
	});
</script>

<Header showSignOut={true} />

{#await namecardPromise then namecard}
	<main class="container mx-auto px-4 max-w-3xl">
		<div class="flex flex-col gap-2 w-full mx-auto p-4">
			<div>
				<Static
					name={namecard.owner.name ?? 'error'}
					github={namecard.owner.githubId ?? 'error'}
					twitter={namecard.owner.twitterId ?? undefined}
					class="w-full shadow-xl"
				/>
			</div>
			<div class="relative">
				<Dynamic
					event={namecard.event.name ?? 'Error'}
					team={namecard.team.name}
					product={namecard.team.product ?? 'Error'}
					usedTechnologies={namecard.usedTechnologies ?? []}
					preferedTechnologies={namecard.preferTechnologies ?? undefined}
					memberOf={namecard.memberOf || undefined}
					class="w-full shadow-xl"
				/>
				{#if $user.type === 'success' && $user.value.id === namecard.owner.id}
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
			{#if $user.type === 'success' && $user.value.id !== namecard.owner.id}
				<div class="py-6">
					<div class="flex gap-2">
						<Input bind:value={comment} placeholder="" class="flex-grow" />
						<Button class="bg-blue-600 px-2 py-2" on:click={send}>
							<SendFilled32 class="h-6 w-6" style="fill:white " />
						</Button>
					</div>
					<div class="text-xs lg:text-sm text-gray-500">
						<p>コメントはプロダクト単位、匿名で公開されます</p>
						<p>誹謗中傷は侮辱罪に該当する場合があります</p>
					</div>
				</div>
			{/if}

			<ul class="flex flex-col gap-6">
				{#each namecard.team.product.comments ?? [] as comment}
					<li class="p-2">
						<span class="text-xl px-4 py-2 rounded shadow border border-gray-200">
							{comment.body}
						</span>
					</li>
				{/each}
			</ul>
		</div>
	</main>
{:catch err}
	<p>{err.toString()}</p>
{/await}

<Footer />
