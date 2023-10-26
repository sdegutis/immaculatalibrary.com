import { snippetIds } from "./snippet-ids.js";

export async function goToRandomSnippet(e: Event) {
  const slugs = await snippetIds;
  const i = Math.floor(Math.random() * slugs.length);
  const slug = slugs[i];
  (e.target as HTMLAnchorElement).href = `/book-snippets/${slug}.html`;
}
