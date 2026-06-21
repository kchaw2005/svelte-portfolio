<script lang="ts">
	const contributions = [
		{
			area: "IDKit",
			title: "Identity verification developer experience",
			description:
				"Contributions around IDKit integration paths, verification UX, and cleaner surfaces for developers adding World ID-style identity flows."
		},
		{
			area: "Tools for Humanity",
			title: "Tools for Humanity product tooling",
			description:
				"Work connected to Tools for Humanity, identity infrastructure, and practical tools that make product and developer workflows easier to ship."
		}
	];
</script>

<svelte:head>
	<title>Kartike Chawla — Software Developer</title>
	<meta
		name="description"
		content="Kartike Chawla builds identity, developer tooling, and product infrastructure with an emphasis on clear interfaces and dependable systems."
	/>
	<meta property="og:title" content="Kartike Chawla — Software Developer" />
	<meta
		property="og:description"
		content="Software developer focused on identity, developer tooling, and product infrastructure."
	/>
</svelte:head>

<main class="site-shell">
	<section id="home" class="intro-section">
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
		</div>
	</section>

	<section id="about" class="content-section">
		<div class="section-heading">
			<p class="eyebrow">About</p>
			<h2>I build identity and developer tooling that stays simple under real-world use.</h2>
		</div>

		<p class="about-text">
			My focus is developer-facing product infrastructure — identity verification flows
			(IDKit / World ID-style), cleaner integration surfaces for developers, and practical
			tooling that makes product and engineering workflows easier to ship.
		</p>
	</section>

	<section id="contributions" class="content-section">
		<div class="section-heading">
			<p class="eyebrow">Contributions</p>
			<h2>IDKit, Tools for Humanity, and useful identity tooling.</h2>
		</div>

		<div class="contribution-list">
			{#each contributions as contribution}
				<article class="contribution-item">
					<p>{contribution.area}</p>
					<h3>{contribution.title}</h3>
					<div>{contribution.description}</div>
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
				A focused writing space for notes on identity systems, developer tooling, product
				infrastructure, and the tradeoffs behind the things I ship.
			</p>
		</div>
	</section>
</main>
