<script lang="ts">
    import "../app.css";
    import Footer from "$lib/components/footer.svelte";

      /* Vanta background */
  import NET from 'vanta/dist/vanta.net.min';
  import * as THREE from 'three';
  import { onMount, onDestroy } from 'svelte';

  let bgElem: HTMLElement;
  let vanta: any;

  onMount(() => {
    vanta = NET({
      el: bgElem,
      THREE,
      mouseControls: true,
      touchControls: true,
      
      /* ----- visual density ----- */
    points: 8,        // how many dots
    maxDistance: 25,  // how long a link can be
    spacing: 18,      // min distance between dots

    /* ----- make it **2‑D** & frozen ----- */
    perspective: 0.0,       // removes “3‑D tilt / depth”
    minHeight: 1.0,         // keep effect alive on small screens
    minWidth: 1.0,

      backgroundColor: 0x000000,
      backgroundAlpha: 0.0
    });
  });

  onDestroy(() => vanta?.destroy());

</script>

<!-- full‑viewport background -->
<div bind:this={bgElem} class="fixed inset-0 -z-10"></div>

<nav class="fixed inset-x-0 top-0 z-50 pt-4 animate-drop-fade">

<div class = "nav-bar-pill">
  <a href="/" class="font-semibold text-black-500 hover:text-indigo-300">
    Kartike Chawla
  </a>

<!--middle zone-->
  <div class="flex gap-6">
    <a href="/about"      class="nav-link">About</a>
    <a href="/experience" class="nav-link">Experience</a>
    <a href="/projects"   class="nav-link">Projects</a>
  </div>

<!--right zone-->
  <button
    class="rounded-full border border-black/50 px-3 py-1 text-sm
           hover:bg-black transition"
    title="Dark mode toggle (coming soon)"
  >
    🌙
  </button>
</div>
</nav>

<slot />

<Footer />  





