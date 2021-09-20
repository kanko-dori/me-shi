<script>
	import Header from '$lib/components/Header.svelte';
	import { Static } from '$lib/svg';
	import { Pen16 } from 'carbon-icons-svelte';
	const user = {
		name: 'Taka',
		githubId: 'onsd',
		twitterId: 'onsd_',
		myNamecards: [
			{
				id: 'github|29172177-testEvent-テストチーム',
				event: {
					name: 'testEvent'
				},
				team: {
					name: 'テストチーム',
					product: {
						name: 'kubesmas',
						comments: [
							{
								body: '007'
							},
							{
								body: '008'
							}
						]
					}
				}
			}
		],
		givenNamecards: [
			{
				id: 'github|1111111-testEvent-テストチーム',
				owner: 'onsd',
				event: {
					name: 'ハックツハッカソン プレシオ'
				},
				team: {
					name: '閑古鳥',
					product: {
						name: 'kubesmas',
						comments: [
							{
								body: '007'
							},
							{
								body: '008'
							}
						]
					}
				}
			},
			{
				id: 'github|1111111-testEvent-テストチーム',
				owner: 'ssssota',
				event: {
					name: 'ハックツハッカソン プレシオ杯'
				},
				team: {
					name: '閑古鳥',
					product: {
						name: 'kubesmas',
						comments: [
							{
								body: '007'
							},
							{
								body: '008'
							}
						]
					}
				}
			}
		]
	};
</script>

<Header />
<div class="container mx-auto relative">
	<div class="aspect-w-2 aspect-h-1 w-3/4 mx-auto ">
		<Static name="閑古鳥" github="kanko-dori" />
	</div>
	<div class="absolute edit-possition bottom-0 ">
		<div class="continer rounded edit-bt opacity-75 bg-gray-800">
			<a
				href="/kaerareru"
				class="flex justify-center items-center outline-none focus:ring-2 w-full h-full"
			>
				<Pen16 class="h-3/5 w-3/5" style="fill:white" />
			</a>
		</div>
	</div>
</div>
<div class="container mx-auto m-4 p-8 bg-gray-200">
	<p>参加したイベントの名刺</p>
	<div class="border-gray-500 border-2" />
	<div class="container relative m-2 w-full top-0 bg-red-500">
		<a href="/event" class="outline-none focus:ring-2 w-full h-full flex ">
			<p>新しくイベントの名刺を作る</p>
			<p class="absolute right-2">+</p>
		</a>
	</div>

	<ul>
		{#each user.myNamecards as mycard}
			<li>
				<div class="container relative m-2 w-full top-0 flex ">
					<a href="/event" class="outline-none focus:ring-2 w-full h-full flex ">
						{mycard.event.name}
						<p class="absolute right-1">→</p>
					</a>
				</div>
			</li>
		{/each}
	</ul>
</div>

<div class="container mx-auto m-4 p-8 bg-gray-200">
	<p>いままでにもらった名刺</p>
	<div class="border-gray-500 border-2" />
	<ul>
		{#each user.givenNamecards as givencard}
			<li>
				<div class="container relative m-2 w-full top-0 flex ">
					<a href="/event" class="outline-none focus:ring-2 w-full h-full flex ">
						<div class="flex-col bg-gray-100">
							<p>{givencard.owner}</p>
							<p>{givencard.event.name}</p>
						</div>
						<p class="absolute right-1 bg-red-500">→</p>
					</a>
				</div>
			</li>
		{/each}
	</ul>
</div>

<style>
	.edit-possition {
		right: 15vw;
		bottom: 5vw;
	}
	.edit-bt {
		height: 6vw;
		width: 6vw;
	}
</style>
