<script lang="ts">
	import DotPortraitCanvas from "$lib/components/dot-portrait/DotPortraitCanvas.svelte";
	import Prose from "$lib/components/prose.svelte";
	import portraitUrl from "$lib/assets/kartike-face.jpeg";
	import { site } from "$lib/content/site";
	import { projects } from "$lib/content/projects";
	import { writings, type Writing } from "$lib/content/writings";
	import { byDateDesc, formatDate, isExternalHref } from "$lib/content/prose";

	const intro = site.intro.join("\n\n");
	const sortedWritings = [...writings].sort(byDateDesc);

	function writingHref(writing: Writing): string {
		return writing.href ?? `/writing/${writing.slug}`;
	}
</script>

<svelte:head>
	<title>{site.name}</title>
</svelte:head>

<div class="columns page-grid">
	<div class="col col-side" aria-hidden="true"></div>

	<div class="col col-main">
		<section class="intro">
			<Prose body={intro} />

			{#if site.socials.length}
				<ul class="socials">
					{#each site.socials as social}
						<li>
							<a
								href={social.href}
								target={isExternalHref(social.href) ? "_blank" : undefined}
								rel={isExternalHref(social.href) ? "noreferrer" : undefined}
							>
								{social.label}
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</section>

		{#if sortedWritings.length}
			<section class="block">
				<h2 class="block-label">writing</h2>
				<ul class="writing-list">
					{#each sortedWritings as writing}
						<li class="writing-item">
							<a
								class="writing-link"
								href={writingHref(writing)}
								target={isExternalHref(writing.href) ? "_blank" : undefined}
								rel={isExternalHref(writing.href) ? "noreferrer" : undefined}
							>
								<span class="writing-title">{writing.title}</span>
								<span class="writing-date">{formatDate(writing.date)}</span>
							</a>
							{#if writing.summary}
								<p class="writing-summary">{writing.summary}</p>
							{/if}
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		{#if projects.length}
			<section class="block">
				<h2 class="block-label">projects</h2>
				<div class="project-grid">
					{#each projects as project}
						<a
							class="project-card"
							href={project.href}
							target={isExternalHref(project.href) ? "_blank" : undefined}
							rel={isExternalHref(project.href) ? "noreferrer" : undefined}
						>
							<span class="project-title">{project.title}</span>
							<span class="project-desc">{project.description}</span>
						</a>
					{/each}
				</div>
			</section>
		{/if}
	</div>

	<div class="col col-portrait">
		<DotPortraitCanvas imageSrc={portraitUrl} />
	</div>
</div>

<style>
	.columns {
		min-height: calc(100svh - 52px);
		padding-block: clamp(32px, 6vh, 64px) clamp(40px, 6vw, 72px);
	}

	.col-main {
		max-width: 38rem;
		text-align: left;
	}

	/* Intro — the lede sits a touch larger than the rest of the page. */
	.intro {
		font-size: 1.125rem;
	}

	.socials {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1.25rem;
		margin: 1.5rem 0 0;
		padding: 0;
		list-style: none;
		font-size: 1rem;
	}

	.socials a {
		text-decoration: none;
		color: var(--muted);
		transition: color 150ms ease;
	}

	.socials a:hover {
		color: var(--text);
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.18em;
	}

	/* Sections below the intro, generously spaced. */
	.block {
		margin-top: clamp(44px, 6vh, 72px);
	}

	.block-label {
		margin: 0 0 1.1rem;
		font-size: 0.78rem;
		font-weight: 500;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--muted);
	}

	/* Writing list */
	.writing-list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.writing-item {
		padding-block: 0.7rem;
		border-top: 1px solid var(--rule);
	}

	.writing-item:first-child {
		border-top: none;
		padding-top: 0;
	}

	.writing-link {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		text-decoration: none;
	}

	.writing-title {
		text-decoration: underline;
		text-decoration-color: transparent;
		text-underline-offset: 0.18em;
		text-decoration-thickness: 1px;
		transition: text-decoration-color 150ms ease;
	}

	.writing-link:hover .writing-title {
		text-decoration-color: currentColor;
	}

	.writing-date {
		flex: none;
		font-size: 0.9rem;
		color: var(--muted);
	}

	.writing-summary {
		margin: 0.3rem 0 0;
		font-size: 0.95rem;
		color: var(--muted);
	}

	/* Project cards — sharp corners, border lightens on hover. */
	.project-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.85rem;
	}

	.project-card {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		padding: 1rem 1.1rem;
		border: 1px solid var(--card-border);
		border-radius: 0; /* sharp corners */
		text-decoration: none;
		transition: border-color 150ms ease;
	}

	.project-card:hover {
		border-color: var(--card-border-hover);
	}

	.project-title {
		font-weight: 500;
	}

	.project-desc {
		font-size: 0.95rem;
		color: var(--muted);
		line-height: 1.45;
	}

	.col-portrait {
		display: flex;
		justify-content: center;
		align-items: start;
	}

	@media (max-width: 900px) {
		.columns {
			min-height: auto;
		}

		.col-main {
			order: 2;
		}

		.col-portrait {
			order: 1;
			margin-bottom: clamp(24px, 5vw, 40px);
		}
	}

	@media (max-width: 520px) {
		.project-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
