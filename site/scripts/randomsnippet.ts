import { snippetIds } from "./snippet-ids.js";

export async function goToRandomSnippet(this: HTMLAnchorElement) {
  const slugs = await snippetIds;
  const i = Math.floor(Math.random() * slugs.length);
  const slug = slugs[i];
  this.href = `/book-snippets/${slug}.html`;
}
