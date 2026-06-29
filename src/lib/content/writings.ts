// ────────────────────────────────────────────────────────────────────────────
// Writings.
//
// To publish a new piece, copy one of the entries below and edit it.
//
//   • Give it a unique `slug` (used in the URL: /writing/<slug>).
//   • `date` is "YYYY-MM-DD". The list is sorted newest-first automatically.
//   • Write your prose in `body`. Blank lines start new paragraphs, and you
//     can hard-wrap lines freely — single line breaks become spaces.
//     Inline links use markdown: [text](url).
//   • To link to something hosted elsewhere instead of writing here, drop
//     `body` and add `href: "https://..."` — the list will link straight out.
// ────────────────────────────────────────────────────────────────────────────

export type Writing = {
	slug: string;
	title: string;
	/** ISO date, "YYYY-MM-DD". */
	date: string;
	/** Optional one-line teaser shown under the title in the list. */
	summary?: string;
	/** Prose for a piece hosted on this site. Renders at /writing/<slug>. */
	body?: string;
	/** External URL — use instead of `body` to link out to another site. */
	href?: string;
};

export const writings: Writing[] = [
	{
		slug: "starting-to-write",
		title: "Starting to write",
		date: "2026-06-29",
		summary: "Why this page exists.",
		body: `
			I've wanted a quiet place to think out loud for a while. Not a feed,
			not a thread — somewhere the writing can be a little slower and a
			little more considered.

			So this is that. A list, a date, and whatever I happened to be
			turning over at the time. If something here is useful to you, even
			better.

			You can always reach me — the links are up top.
		`
	},
	{
		slug: "example-link-out",
		title: "Something I wrote elsewhere",
		date: "2026-05-02",
		summary: "An example of an entry that links to another site.",
		href: "https://example.com"
	}
];
