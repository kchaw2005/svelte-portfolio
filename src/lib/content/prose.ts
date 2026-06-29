// ────────────────────────────────────────────────────────────────────────────
// Tiny, dependency-free helpers for rendering prose and dates.
//
//   • parseProse() turns a body string into paragraphs of text/link tokens,
//     so writing pages can render inline [text](url) links without {@html}.
//   • formatDate() / byDateDesc avoid `new Date("YYYY-MM-DD")` timezone bugs
//     by parsing the string parts directly.
// ────────────────────────────────────────────────────────────────────────────

export type ProseToken = { text: string; href?: string };

const MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];

const INLINE_LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Only allow link schemes we trust; anything else renders as plain text. */
export function isSafeHref(href: string): boolean {
	return /^(https?:\/\/|mailto:|\/|#)/i.test(href);
}

/** True for off-site links, which should open in a new tab. */
export function isExternalHref(href?: string): boolean {
	return !!href && /^https?:\/\//i.test(href);
}

/** Split one line of text into plain-text and link tokens. */
function tokenizeInline(text: string): ProseToken[] {
	const tokens: ProseToken[] = [];
	let lastIndex = 0;
	let match: RegExpExecArray | null;

	INLINE_LINK.lastIndex = 0;
	while ((match = INLINE_LINK.exec(text)) !== null) {
		if (match.index > lastIndex) {
			tokens.push({ text: text.slice(lastIndex, match.index) });
		}

		const [, label, href] = match;
		if (isSafeHref(href)) {
			tokens.push({ text: label, href });
		} else {
			// Unsafe / unrecognised scheme — keep the raw text, drop the link.
			tokens.push({ text: match[0] });
		}

		lastIndex = match.index + match[0].length;
	}

	if (lastIndex < text.length) {
		tokens.push({ text: text.slice(lastIndex) });
	}

	return tokens;
}

/**
 * Turn a body string into an array of paragraphs, each an array of tokens.
 * Blank lines separate paragraphs; single newlines within a paragraph become
 * spaces (so source prose can be hard-wrapped freely).
 */
export function parseProse(body: string): ProseToken[][] {
	return body
		.trim()
		.split(/\n\s*\n/)
		.map((paragraph) => paragraph.trim().replace(/\s*\n\s*/g, " "))
		.filter((paragraph) => paragraph.length > 0)
		.map(tokenizeInline);
}

/** Format "2026-06-29" as "Jun 29, 2026". Returns the input unchanged if malformed. */
export function formatDate(iso: string): string {
	const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
	if (!match) {
		return iso;
	}

	const [, year, month, day] = match;
	const monthName = MONTHS[Number(month) - 1];
	if (!monthName) {
		return iso;
	}

	return `${monthName} ${Number(day)}, ${year}`;
}

/** Comparator for sorting writings newest-first. */
export function byDateDesc(a: { date: string }, b: { date: string }): number {
	return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
}
