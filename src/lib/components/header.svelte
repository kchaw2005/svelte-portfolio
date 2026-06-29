<script lang="ts">
	import { site } from "$lib/content/site";
</script>

<header class="site-header page-grid">
	<div class="col-side" aria-hidden="true"></div>
	<div class="col-name">
		<a class="site-name" href="/">{site.name}</a>
	</div>
	<div aria-hidden="true"></div>
</header>

<style>
	.site-header {
		padding-block: 16px 8px;
	}

	/* Wrapper fills the grid cell; the link only spans its own text, so the
	   click target is the name itself — not the whole header row. */
	.site-name {
		display: inline-block;
		font-size: 1.0625rem;
		font-weight: 500;
		letter-spacing: 0.01em;
		text-decoration: none;
	}

	.site-name:hover {
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.18em;
	}
</style>
