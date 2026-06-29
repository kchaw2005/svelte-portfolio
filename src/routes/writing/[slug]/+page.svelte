<script lang="ts">
	import Prose from "$lib/components/prose.svelte";
	import { formatDate } from "$lib/content/prose";
	import { site } from "$lib/content/site";
	import type { PageData } from "./$types";

	let { data }: { data: PageData } = $props();

	const writing = $derived(data.writing);
</script>

<svelte:head>
	<title>{writing.title} · {site.name}</title>
</svelte:head>

<article class="writing page-grid">
	<div class="col-side" aria-hidden="true"></div>

	<div class="writing-body">
		<a class="back" href="/">← back</a>

		<header class="writing-head">
			<h1>{writing.title}</h1>
			<p class="meta">{formatDate(writing.date)}</p>
		</header>

		<div class="prose">
			<Prose body={writing.body ?? ""} />
		</div>
	</div>

	<div aria-hidden="true"></div>
</article>

<style>
	.writing {
		padding-block: clamp(28px, 5vh, 56px) clamp(40px, 6vw, 72px);
	}

	.writing-body {
		max-width: 38rem;
	}

	.back {
		display: inline-block;
		margin-bottom: clamp(28px, 5vh, 48px);
		font-size: 0.95rem;
		color: var(--muted);
		text-decoration: none;
		transition: color 150ms ease;
	}

	.back:hover {
		color: var(--text);
		text-decoration: underline;
		text-underline-offset: 0.18em;
	}

	.writing-head {
		margin-bottom: clamp(24px, 4vh, 40px);
	}

	.writing-head h1 {
		margin: 0;
		font-size: clamp(1.6rem, 3vw, 2rem);
		font-weight: 500;
		line-height: 1.2;
	}

	.meta {
		margin: 0.5rem 0 0;
		font-size: 0.95rem;
		color: var(--muted);
	}

	.prose {
		font-size: 1.1875rem;
		line-height: 1.75;
	}
</style>
