import { error } from "@sveltejs/kit";
import { writings } from "$lib/content/writings";
import type { EntryGenerator, PageLoad } from "./$types";

// Each writing with a `body` is rendered as a static page at build time.
export const prerender = true;

export const entries: EntryGenerator = () => {
	return writings.filter((writing) => writing.body).map((writing) => ({ slug: writing.slug }));
};

export const load: PageLoad = ({ params }) => {
	const writing = writings.find((entry) => entry.slug === params.slug && entry.body);

	if (!writing) {
		// Unknown slug, or an entry that only links out (no body to render here).
		error(404, "Writing not found");
	}

	return { writing };
};
