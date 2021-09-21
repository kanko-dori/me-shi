<script lang="ts">
	import { goto } from '$app/navigation';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { user } from '$lib/store';
	import { Static } from '$lib/svg';
	import { Pen16 } from 'carbon-icons-svelte';
	import Add16 from 'carbon-icons-svelte/lib/Add16';
	import ArrowRight16 from 'carbon-icons-svelte/lib/ArrowRight16';

	user.subscribe((u) => {
		if (u.type === 'failure') goto('/');
		return;
	});
</script>

<Header showSignOut={true} />

<main class="container mx-auto max-w-screen-lg relative px-4">
	<div class="p-8">
		<div class="max-w-3xl w-full mx-auto relative">
			<Static
				name={$user.type === 'success' ? $user.value.name ?? 'Loading failure' : ''}
				github={$user.type === 'success' ? $user.value.githubId ?? 'Loadgin failure' : ''}
				twitter={$user.type === 'success' ? $user.value.twitterId ?? undefined : undefined}
				class="w-full shadow-xl"
			/>
			<a
				href="/kaerareru"
				class="absolute flex justify-center items-center outline-none focus:ring-2 w-12 h-12 rounded-md opacity-75 bg-gray-800 right-2 bottom-2"
			>
				<Pen16 class="h-3/5 w-3/5" style="fill:white" />
			</a>
		</div>
	</div>

	<div class="md:flex">
		<section class="md:w-1/2 md:px-2 py-4">
			<p class="text-xl p-2 border-b-2 border-gray-300">参加したイベントの名刺</p>
			<ul>
				<li>
					<a
						href="/tsukureru"
						class="group hover:bg-gray-100 transition outline-none focus:ring-2 w-full h-full flex p-2 items-center"
					>
						<p>新しくイベントの名刺を作る</p>
						<div class="flex-grow" />
						<Add16
							class="transition-transform duration-200 ease-out group-hover:rotate-180 group-hover:scale-150"
						/>
					</a>
				</li>
				{#each $user.type === 'success' ? $user.value.myNamecards ?? [] : [] as mycard}
					<li>
						<a
							href="/mirareru/{mycard.id}"
							class="group hover:bg-gray-100 transition outline-none focus:ring-2 w-full h-full flex p-2 items-center"
						>
							<p>{mycard.event.name}</p>
							<div class="flex-grow" />
							<ArrowRight16
								class="transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:scale-110"
							/>
						</a>
					</li>
				{/each}
			</ul>
		</section>
		<section class="md:w-1/2 md:px-2 py-4">
			<p class="text-xl p-2 border-b-2 border-gray-300">いままでにもらった名刺</p>
			<ul>
				{#each $user.type === 'success' ? $user.value.givenNamecards ?? [] : [] as givencard}
					<li>
						<a
							href="/mirareru/{givencard.id}"
							class="group hover:bg-gray-100 transition outline-none focus:ring-2 w-full h-full flex p-2 items-center"
						>
							<div class="flex-col">
								<p>{givencard.owner?.name ?? 'Error'}</p>
								<p class="text-sm text-gray-500">{givencard.event.name}</p>
							</div>
							<div class="flex-grow" />
							<ArrowRight16
								class="transition-transform duration-200 ease-out group-hover:translate-x-1 group-hover:scale-110"
							/>
						</a>
					</li>
				{/each}
			</ul>
		</section>
	</div>
</main>

<Modal open={$user.type !== 'success'}>
	<div class="z-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
		<Loading />
	</div>
</Modal>

<Footer />
