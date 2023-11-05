import { snippetIds } from "./snippet-ids.js";
import { randomElement } from "./util.js";

export async function goToRandomSnippet(this: HTMLAnchorElement) {
  const slug = randomElement(await snippetIds);
  this.href = `/book-snippets/${slug}.html`;
}
