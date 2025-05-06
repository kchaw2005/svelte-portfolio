<script lang="ts">
    // update the year automatically
    import HugeiconsLinkedin02 from '~icons/hugeicons/linkedin-02';
    import HugeiconsGithub from '~icons/hugeicons/github';
    const year = new Date().getFullYear();
  </script>
  
  <footer
    class="footer-bar animate-fade-up"
  >
    <div class="flex items-center justify-between w-full">
      <!-- left: mini bio -->
      <p class="text-gray-500">
        © {year} Kartike Chawla
      </p>
  
      <!-- right: social row -->
      <div class="flex-1 flex justify-end gap-6 text-gray-400">
        <a href="https://github.com/kchaw2005" 
        aria-label="Github" 
        class="hover:text-indigo-400 transition" 
        target="_blank" rel="noreferrer">

        <HugeiconsGithub class="w-6 h-6" />
        </a>
        
        <a  href="https://linkedin.com/in/kchaw2005/"
          aria-label="LinkedIn"
          class="hover:text-indigo-400 transition"
          target="_blank" rel="noreferrer"
      >
        <HugeiconsLinkedin02 class="w-6 h-6" />
      </a>
      </div>
    </div>
  </footer>
  