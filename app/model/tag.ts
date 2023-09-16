import { ViewTagRoute } from "../routes/snippets/tag";
import { sortBy } from "../util/helpers";
import { Snippet } from "./snippet";

export const allTags = new Map<string, Tag>();

export class Tag {

  snippets = new Set<Snippet>();

  static getOrCreate(name: string) {
    let tag = allTags.get(name);
    if (!tag) allTags.set(name, tag = new Tag(name));
    return tag;
  }

  view;
  slug;

  constructor(public name: string) {
    this.slug = this.name.split(' ').map(capitalize).join('');
    this.view = new ViewTagRoute(this);
  }

  addSnippet(snippet: Snippet) {
    this.snippets.add(snippet);
  }

  removeSnippet(snippet: Snippet) {
    this.snippets.delete(snippet);
  }

}

export function sortedTags() {
  return [...allTags.values()].sort(sortBy(tag => tag.name));
}

function capitalize(str: string) {
  return str[0]?.toUpperCase() + str.slice(1);
}
