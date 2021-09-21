<script lang="ts">
	import { page } from '$app/stores';

	import '../app.postcss';

	const title = 'me-shi - イベントで少しだけ繋がってみるアプリ';
	const description =
		'イベントで会ったあの人と少しだけ繋がってみませんか？me-shiは名刺でつながるSNS。メッセージのやりとりは感想を送るのみの最小限です。名刺を集めるついでに少しだけ喋ってみましょう';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
		rel="stylesheet"
	/>
	<script>
		if (global === undefined) var global = window;
	</script>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:url" content="https://me-shi.ga{$page.path}" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content="me-shi" />
	<meta property="og:image" content="https://me-shi.ga/ogp.png" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<div class="font-body">
	<slot />
</div>
