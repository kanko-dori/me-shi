<script lang="ts">
	import { Header, Footer, ZukanCard } from '$lib/components';
	let eventname = 'ハッカソン';
</script>

<Header />
<main class="container mx-auto px-4 max-w-screen-lg">
	<section class="flex px-4 py-8">
		<h1 class="text-4xl">{eventname}</h1>
		<div class="flex-grow" />
		<p class="text-sm lg:text-lg text-gray-500">5/40</p>
	</section>
	<section class="px-4">
		<div>
			<div class="flex">
				<h3 class="text-2xl">
					<span class="text-sm text-gray-500">team</span>
					閑古鳥
				</h3>
				<div class="flex-grow" />
				<p class="text-sm lg:text-md text-gray-500">1/3</p>
			</div>
			<div class="flex flex-wrap gap-4">
				<ZukanCard
					name="octocat"
					icon="https://github.com/octocat.png"
					isOwn={true}
					class="w-32 lg:w-48"
				/>
				<ZukanCard
					name="octocat"
					icon="https://github.com/octocat.png"
					isOwn={false}
					class="w-32 lg:w-48"
				/>
				<ZukanCard
					name="Tommykawa Sotaro"
					icon="https://github.com/ssssota.png"
					isOwn={false}
					class="w-32 lg:w-48"
				/>
			</div>
		</div>
	</section>
</main>
<Footer />
