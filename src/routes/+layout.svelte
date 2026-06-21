<script lang="ts">
	import "../app.css";
	import Footer from "$lib/components/footer.svelte";
	import HugeiconsMoon02 from "~icons/hugeicons/moon-02";
	import HugeiconsSun03 from "~icons/hugeicons/sun-03";
	import { onDestroy, onMount } from "svelte";

	let bgElem: HTMLElement;
	let vanta: any;
	let isDark = false;
	let destroyed = false;

	const applyTheme = (dark: boolean) => {
		if (typeof document === "undefined") return;

		isDark = dark;
		document.documentElement.classList.toggle("dark", dark);
		localStorage.setItem("theme", dark ? "dark" : "light");
		vanta?.setOptions?.({ color: dark ? 0x93c5fd : 0x2563eb });
	};

	const toggleTheme = () => applyTheme(!isDark);

	onMount(async () => {
		const savedTheme = localStorage.getItem("theme");
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

		const [vantaModule, THREE] = await Promise.all([
			import("vanta/dist/vanta.net.min"),
			import("three")
		]);

		if (destroyed) return;

		const NET = (vantaModule.default ?? vantaModule) as any;
		vanta = NET({
			el: bgElem,
			THREE,
			mouseControls: true,
			touchControls: true,
			points: 8,
			maxDistance: 25,
			spacing: 18,
			perspective: 0.0,
			minHeight: 1.0,
			minWidth: 1.0,
			color: isDark ? 0x93c5fd : 0x2563eb,
			backgroundAlpha: 0.0
		});
	});

	onDestroy(() => {
		destroyed = true;
		vanta?.destroy();
	});
</script>

<div bind:this={bgElem} class="fixed inset-0 -z-10"></div>

<nav class="fixed inset-x-0 top-0 z-50 px-4 pt-4 animate-drop-fade" aria-label="Primary">
	<div class="nav-bar-pill">
		<a href="/#home" class="nav-name">Kartike Chawla</a>
		<span class="nav-separator" aria-hidden="true">|</span>

		<div class="nav-items">
			<a href="/#blog" class="nav-link">Blog</a>
			<a href="/#contributions" class="nav-link">Contributions</a>
			<a
				href="https://github.com/kchaw2005"
				class="nav-link"
				target="_blank"
				rel="noreferrer"
			>
				GitHub
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

<slot />

<Footer />
