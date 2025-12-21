<script lang="ts">
    import { onMount } from "svelte";

    let titleOpacity = 1;
    let titleTranslate = 0;
    const fadeDistance = 260;

    const updateTitle = () => {
        const scrollY = window.scrollY || 0;
        const progress = Math.min(scrollY / fadeDistance, 1);
        titleOpacity = 1 - progress;
        titleTranslate = -24 * progress;
    };

    const fadeIn = (node: HTMLElement) => {
        if (typeof IntersectionObserver === "undefined") {
            node.classList.add("in-view");
            return {};
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        observer.observe(node);

        return {
            destroy() {
                observer.disconnect();
            }
        };
    };

    onMount(() => {
        updateTitle();
        window.addEventListener("scroll", updateTitle, { passive: true });
        return () => window.removeEventListener("scroll", updateTitle);
    });
</script>

<section class="min-h-screen flex items-center py-24">
    <div class="w-full max-w-4xl mx-auto px-6 space-y-6">
        <header
            class="space-y-4 max-w-2xl"
            style="opacity: {titleOpacity}; transform: translateY({titleTranslate}px);"
        >
            <h1 class="text-5xl sm:text-6xl font-extrabold tracking-tight animate-drop-fade">
                About Me
            </h1>
            <p class="text-lg sm:text-xl text-neutral-600">
                Add a short overview here about who you are, what you do, and what you care about.
            </p>
        </header>
        <p class="text-sm uppercase tracking-[0.2em] text-neutral-400">
            Scroll to learn more
        </p>
    </div>
</section>

<section class="py-16">
    <div class="w-full max-w-5xl mx-auto px-6 space-y-10">
        <section class="grid gap-6 sm:grid-cols-2">
            <div
                class="fade-card p-6 rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur"
                use:fadeIn
            >
                <h2 class="text-xl font-bold mb-2">Quick Intro</h2>
                <p class="text-neutral-600">
                    Write a 2-3 sentence intro: your role, niche, and what makes your work distinct.
                </p>
            </div>

            <div
                class="fade-card p-6 rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur"
                style="transition-delay: 80ms;"
                use:fadeIn
            >
                <h2 class="text-xl font-bold mb-2">What I'm Focused On</h2>
                <p class="text-neutral-600">
                    Share the projects, problems, or skills you're currently focused on improving.
                </p>
            </div>

            <div
                class="fade-card p-6 rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur"
                style="transition-delay: 160ms;"
                use:fadeIn
            >
                <h2 class="text-xl font-bold mb-2">Highlights</h2>
                <p class="text-neutral-600">
                    Add a few milestones, wins, or metrics you are proud of.
                </p>
            </div>

            <div
                class="fade-card p-6 rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur"
                style="transition-delay: 240ms;"
                use:fadeIn
            >
                <h2 class="text-xl font-bold mb-2">Outside of Work</h2>
                <p class="text-neutral-600">
                    Share a few interests or hobbies to show personality.
                </p>
            </div>
        </section>

        <section class="fade-card space-y-3 max-w-2xl" style="transition-delay: 120ms;" use:fadeIn>
            <h2 class="text-2xl font-bold">Now</h2>
            <p class="text-neutral-600">
                Write a short "now" paragraph with what you're learning, building, or exploring.
            </p>
        </section>
    </div>
</section>

<style>
    :global(.fade-card) {
        opacity: 0;
        transform: translateY(22px);
        transition: opacity 600ms ease, transform 600ms ease;
    }

    :global(.fade-card.in-view) {
        opacity: 1;
        transform: translateY(0);
    }
</style>
