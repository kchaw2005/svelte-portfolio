// ────────────────────────────────────────────────────────────────────────────
// Projects shown as cards on the front page.
// Add / remove / reorder entries here. Order = display order.
// ────────────────────────────────────────────────────────────────────────────

export type Project = {
	title: string;
	/** One short line under the title. */
	description: string;
	/** Where the card links to. External links open in a new tab. */
	href: string;
};

export const projects: Project[] = [
	{
		title: "Example project",
		description: "A one-line description of what it is.",
		href: "https://example.com"
	},
	{
		title: "Another thing",
		description: "Replace these with your real projects.",
		href: "https://example.com"
	}
];
