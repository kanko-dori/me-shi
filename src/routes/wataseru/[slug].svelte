<script lang="ts">
	import { QRcode, Header, Footer } from '$lib/components';
	import { Dynamic } from '$lib/svg';
</script>

<Header />
<main class="container max-w-screen-lg px-4 mx-auto">
	<QRcode
		content="NKO DICE"
		class="max-w-lg mx-auto"
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
	<p class="p-8 shadow-xl">
		<Dynamic
			event="テストハッカソン"
			team="あ"
			product={{ name: 'いのちのかがやき' }}
			usedTechnologies={['日本の叡智']}
			preferedTechnologies={['自分の頭']}
			class="max-w-5xl mx-auto"
		/>
	</p>
</main>
<Footer />
