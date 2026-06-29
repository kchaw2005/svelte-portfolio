// ────────────────────────────────────────────────────────────────────────────
// Site identity + intro + social links.
// This is the file to edit for the top of the page and your socials.
// ────────────────────────────────────────────────────────────────────────────

export type SocialLink = {
	/** Text shown for the link, e.g. "twitter" */
	label: string;
	/** Full URL, e.g. "https://x.com/yourhandle" or "mailto:you@example.com" */
	href: string;
};

export const site = {
	/** Shown in the header and the browser tab. */
	name: "Kartike Chawla",

	/**
	 * The intro at the top of the page.
	 * Each string is its own paragraph. Inline links use markdown: [text](url).
	 */
	intro: [
		"building at [worldcoin](https://worldcoin.org)."
	],

	/** Social / contact links, shown as a small row near the top. */
	socials: [
		{ label: "twitter", href: "https://x.com/" },
		{ label: "github", href: "https://github.com/kchaw2005" },
		{ label: "email", href: "mailto:kartike.chawla@toolsforhumanity.com" }
	] satisfies SocialLink[]
};
