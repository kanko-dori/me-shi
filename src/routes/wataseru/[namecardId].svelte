<script lang="ts">
	import { page } from '$app/stores';

	import { QRcode, Header, Footer } from '$lib/components';
	import { Dynamic } from '$lib/svg';
</script>

<Header />
<main class="container max-w-screen-lg px-4 mx-auto">
	<div class="container mx-auto flex">
		<QRcode
			content="https://me-shi.ga/mirareru/{$page.params.namecardId}"
			class="w-2/5 h-2/5 mx-auto shadow-xl"
			color={[
				{
					color: '#3b82f6',
					offset: 0
				},
				{
					color: '#34d399',
					offset: 100
				}
			]}
		/>
	</div>
	<p class="p-8 shadow-xl">
		<Dynamic
			event="テストハッカソン"
			team="あ"
			product={{ name: 'いのちのかがやき' }}
			usedTechnologies={['日本の叡智']}
			preferedTechnologies={['自分の頭']}
			class="max-w-3xl mx-auto"
		/>
	</p>
</main>
<Footer />
