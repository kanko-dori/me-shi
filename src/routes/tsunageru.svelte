<script>
	import Header from '$lib/components/Header.svelte';
	import { Static } from '$lib/svg';
	import { Pen16 } from 'carbon-icons-svelte';
	// 値の仮置き
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
			},
			{
				id: 'github|29172177-testEvent-テストチーム',
				event: {
					name: 'サマーハッカソン'
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
					name: 'ハックツハッカソン スピノカップ'
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
<div class="container mx-auto m-4 p-8 ">
	<p class="t-size">参加したイベントの名刺</p>
	<div class="border-gray-400 border mb-6" />
	<a href="/" class="relative t-size outline-none focus:ring-2 w-full h-full flex ">
		<p>新しくイベントの名刺を作る</p>
		<div class="flex-grow" />
		<p>+</p>
	</a>

	<ul>
		{#each user.myNamecards as mycard}
			<li>
				<a href="/" class="outline-none focus:ring-2 mt-2 w-full h-full flex t-size">
					<p>{mycard.event.name}</p>
					<div class="flex-grow" />
					<p class="t-size">→</p>
				</a>
			</li>
		{/each}
	</ul>
</div>

<div class="container mx-auto m-4 p-8">
	<p class="t-size">いままでにもらった名刺</p>
	<div class="border-gray-400 border mb-6" />
	<ul>
		{#each user.givenNamecards as givencard}
			<li>
				<a href="/" class="outline-none focus:ring-2 mt-2 w-full h-full flex">
					<div class="flex-col">
						<p class="t-size">{givencard.owner}</p>
						<p>{givencard.event.name}</p>
					</div>
					<div class="flex-grow" />
					<div class="flex h-hull items-center">
						<p class="t-size ">→</p>
					</div>
				</a>
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
	.t-size {
		font-size: 3vw;
	}
</style>
