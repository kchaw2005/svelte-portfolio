<script lang="ts">
	import { onMount } from "svelte";
	import { DotPortraitEngine } from "./dotPortraitEngine";
	import { isPortraitFrozen } from "./portraitDots";

	let {
		imageSrc,
		label = "Dot portrait of Kartike Chawla"
	}: {
		imageSrc: string;
		label?: string;
	} = $props();

	let canvas: HTMLCanvasElement | undefined;
	let frame: HTMLDivElement | undefined;
	let loadFailed = $state(false);
	let portrait: DotPortraitEngine | undefined;

	const editMode = import.meta.env.DEV && !isPortraitFrozen;

	onMount(() => {
		if (!canvas || !frame) {
			return;
		}

		portrait = new DotPortraitEngine(canvas, { imageSrc });

		const observer = new ResizeObserver(() => portrait?.resize());
		observer.observe(frame);

		portrait.load().catch(() => {
			loadFailed = true;
		});

		return () => {
			observer.disconnect();
			portrait?.dispose();
		};
	});

	function handlePointerDown(event: PointerEvent) {
		if (!editMode || !canvas || !portrait || !event.altKey) {
			return;
		}

		event.preventDefault();

		const rect = canvas.getBoundingClientRect();
		const remaining = portrait.removeDotNear(event.clientX - rect.left, event.clientY - rect.top);

		if (remaining !== null) {
			console.log(`Removed dot — ${remaining} remaining. Press Shift+S when done to export snapshot.`);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!editMode || !portrait || !event.shiftKey || event.key.toLowerCase() !== "s") {
			return;
		}

		event.preventDefault();

		const snapshot = portrait.exportSnapshot();

		console.log(
			`Copy ONLY the line below into portraitDots.ts (${snapshot.length} dots):\n\n` +
				`export const FROZEN_PORTRAIT_DOTS: readonly FrozenDot[] = ${JSON.stringify(snapshot, null, "\t")};\n`
		);
	}
</script>

<div class="dot-portrait-frame" bind:this={frame}>
	<canvas
		bind:this={canvas}
		class="dot-portrait-canvas"
		class:edit-mode={editMode}
		aria-label={label}
		tabindex={editMode ? 0 : undefined}
		onkeydown={handleKeydown}
		onpointerdown={handlePointerDown}
	></canvas>

	{#if loadFailed}
		<img src={imageSrc} alt={label} class="portrait-fallback" />
	{/if}

	{#if editMode}
		<p class="edit-hint">Dev: Option+click to remove · Shift+S to export snapshot</p>
	{/if}
</div>

<style>
	.dot-portrait-frame {
		position: relative;
		width: min(100%, 560px);
		aspect-ratio: 1;
		margin-inline: auto;
	}

	.dot-portrait-canvas,
	.portrait-fallback {
		position: absolute;
		inset: 0;
		display: block;
		width: 100%;
		height: 100%;
	}

	.dot-portrait-canvas.edit-mode {
		cursor: crosshair;
		outline: none;
	}

	.portrait-fallback {
		object-fit: cover;
		opacity: 0.9;
	}

	.edit-hint {
		position: absolute;
		inset-inline: 0;
		bottom: -28px;
		margin: 0;
		color: #888;
		font-size: 0.72rem;
		text-align: center;
	}
</style>
