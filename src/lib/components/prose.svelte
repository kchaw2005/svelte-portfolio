<script lang="ts">
	import { parseProse, isExternalHref } from "$lib/content/prose";

	let { body }: { body: string } = $props();

	const paragraphs = $derived(parseProse(body));
</script>

{#each paragraphs as paragraph}
	<p>
		{#each paragraph as token}
			{#if token.href}
				<a
					href={token.href}
					target={isExternalHref(token.href) ? "_blank" : undefined}
					rel={isExternalHref(token.href) ? "noreferrer" : undefined}>{token.text}</a
				>
			{:else}{token.text}{/if}
		{/each}
	</p>
{/each}

<style>
	p {
		margin: 0 0 1em;
	}

	p:last-child {
		margin-bottom: 0;
	}

	a {
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.15em;
		transition: opacity 150ms ease;
	}

	a:hover {
		opacity: 0.6;
	}
</style>
