<script lang="ts">
	const year = new Date().getFullYear();

	const socials = [
		{ label: "GitHub", href: "https://github.com/kchaw2005" },
		{ label: "LinkedIn", href: "https://linkedin.com/in/kchaw2005/" }
	];
</script>

<footer class="footer-bar">
	<p>© {year} Kartike Chawla</p>

	<nav aria-label="Social links">
		{#each socials as social}
			<a href={social.href} target="_blank" rel="noreferrer">{social.label}</a>
		{/each}
	</nav>
</footer>
