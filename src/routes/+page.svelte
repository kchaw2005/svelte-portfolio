<script lang="ts">
	import DotPortraitCanvas from "$lib/components/dot-portrait/DotPortraitCanvas.svelte";
	import portraitUrl from "$lib/assets/kartike-face.jpeg";

	// ——— edit your copy here ———
	const lines = ["building @worldcoin"];
</script>

<svelte:head>
	<title>Kartike Chawla</title>
</svelte:head>

<div class="columns">
	<div class="col col-side" aria-hidden="true"></div>

	<div class="col col-main">
		{#each lines as line}
			<p>{line}</p>
		{/each}
	</div>

	<div class="col col-portrait">
		<DotPortraitCanvas imageSrc={portraitUrl} />
	</div>
</div>

<style>
	.columns {
		display: grid;
		min-height: calc(100svh - 72px);
		align-items: center;
		gap: clamp(16px, 3vw, 40px);
		padding: clamp(24px, 5vw, 48px);
		grid-template-columns: 1fr 2.4fr 1.2fr;
	}

	.col-main {
		text-align: left;
	}

	.col-main p {
		margin: 0 0 0.6em;
		font-size: clamp(1.75rem, 4vw, 3rem);
		font-weight: 400;
		line-height: 1.2;
	}

	.col-main p:last-child {
		margin-bottom: 0;
	}

	.col-portrait {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media (max-width: 900px) {
		.columns {
			min-height: auto;
			grid-template-columns: 1fr;
			grid-template-rows: auto auto;
		}

		.col-side {
			display: none;
		}

		.col-main {
			order: 2;
		}

		.col-portrait {
			order: 1;
		}
	}
</style>
