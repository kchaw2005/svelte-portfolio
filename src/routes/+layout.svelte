<script lang="ts">
	import "../app.css";
	import Header from "$lib/components/header.svelte";

	let { children } = $props();
</script>

<div class="site">
	<Header />
	<main class="site-main">
		{@render children()}
	</main>
</div>
