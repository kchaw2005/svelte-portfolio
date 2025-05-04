<script lang="ts">
    import "../app.css";
    let { children } = $props();
</script>

<nav class="fixed inset-x-0 top-0 z-50 pt-4 animate-drop-fade">

<div class = "nav-bar-pill">
  <a href="#top" class="font-semibold text-black-500 hover:text-indigo-300">
    Kartike Chawla
  </a>

<!--middle zone-->
  <div class="flex gap-6">
    <a href="#about"      class="nav-link">About</a>
    <a href="#experience" class="nav-link">Experience</a>
    <a href="#projects"   class="nav-link">Projects</a>
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


{@render children()}