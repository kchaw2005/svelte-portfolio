<script lang="ts">
	const contributions = [
		{
			title: "IDKit",
			description:
				"Contributions around IDKit, developer identity flows, and cleaner integration surfaces for World ID-style verification."
		},
		{
			title: "Tools for Humanity",
			description:
				"Work connected to Tools for Humanity and identity tooling, with a focus on practical developer experience and reliable product surfaces."
		}
	];
</script>

<main class="site-shell">
	<section id="home" class="hero-section">
		<div class="profile-square" aria-label="Personal image placeholder">
			<span>KC</span>
		</div>

		<div class="hero-copy">
			<p class="eyebrow animate-drop-fade">Software Developer</p>
			<h1 class="animate-drop-fade" style="animation-delay: 100ms">
				Kartike Chawla
			</h1>
			<p class="hero-lede animate-drop-fade" style="animation-delay: 180ms">
				I build identity, developer tooling, and product infrastructure with an emphasis on
				clear interfaces and dependable systems.
			</p>

			<div class="hero-callout animate-fade-up" style="animation-delay: 260ms">
				<p>IDKit and Tools for Humanity contributions are the center of this portfolio.</p>
				<a href="#contributions">View contributions</a>
			</div>
		</div>
	</section>

	<section id="contributions" class="content-section">
		<div class="section-heading">
			<p class="eyebrow">Contributions</p>
			<h2>IDKit, Tools for Humanity, and identity tooling</h2>
		</div>

		<div class="contribution-grid">
			{#each contributions as contribution}
				<article class="feature-card">
					<h3>{contribution.title}</h3>
					<p>{contribution.description}</p>
				</article>
			{/each}
		</div>
	</section>

	<section id="blog" class="content-section">
		<div class="section-heading">
			<p class="eyebrow">Blog</p>
			<h2>Notes on identity, tooling, and software craft</h2>
		</div>

		<div class="blog-panel">
			<p>
				A focused writing space for technical notes, project breakdowns, and lessons from
				building developer-facing systems.
			</p>
		</div>
	</section>
</main>
