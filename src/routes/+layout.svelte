<script lang="ts">
	import "../app.css";
	import Footer from "$lib/components/footer.svelte";
	import HugeiconsMoon02 from "~icons/hugeicons/moon-02";
	import HugeiconsSun03 from "~icons/hugeicons/sun-03";
	import LucideExternalLink from "~icons/lucide/external-link";
	import { onMount } from "svelte";

	let { children } = $props();
	let isDark = $state(false);

	function applyTheme(dark: boolean) {
		isDark = dark;
		const el = document.documentElement;
		el.classList.toggle("dark", dark);
		el.style.colorScheme = dark ? "dark" : "light";
		try {
			localStorage.setItem("theme", dark ? "dark" : "light");
		} catch (e) {
			/* storage unavailable — theme simply won't persist */
		}
	}

	const toggleTheme = () => applyTheme(!isDark);

	onMount(() => {
		// Initial theme is applied pre-paint by the inline script in app.html;
		// sync component state to whatever the DOM already reflects.
		isDark = document.documentElement.classList.contains("dark");
	});
</script>

<nav class="fixed inset-x-0 top-0 z-50 px-4 pt-4 animate-drop-fade" aria-label="Primary">
	<div class="nav-bar-pill">
		<a href="/#home" class="nav-name">Kartike Chawla</a>
		<span class="nav-separator" aria-hidden="true">|</span>

		<div class="nav-items">
			<a href="/#about" class="nav-link">About</a>
			<a href="/#projects" class="nav-link">Projects</a>
			<a href="/#blog" class="nav-link">Writing</a>
			<a
				href="https://github.com/kchaw2005"
				class="nav-link"
				target="_blank"
				rel="noreferrer"
			>
				GitHub
				<LucideExternalLink class="external-icon" aria-hidden="true" />
			</a>
			<button
				type="button"
				class="theme-toggle"
				aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
				title={isDark ? "Switch to light mode" : "Switch to dark mode"}
				onclick={toggleTheme}
			>
				{#if isDark}
					<HugeiconsSun03 class="h-5 w-5" aria-hidden="true" />
				{:else}
					<HugeiconsMoon02 class="h-5 w-5" aria-hidden="true" />
				{/if}
			</button>
		</div>
	</div>
</nav>

{@render children()}

<Footer />
