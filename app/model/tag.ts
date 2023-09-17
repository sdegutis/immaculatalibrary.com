import { sortBy } from "../core/helpers";
import { Snippet } from "./snippets";

export const allTags = new Map<string, Tag>();

export class Tag {

  static getOrCreate(name: string) {
    let tag = allTags.get(name);
    if (!tag) allTags.set(name, tag = new Tag(name));
    return tag;
  }

  snippets = new Set<Snippet>();
  slug;

  constructor(public name: string) {
    this.slug = this.name.split(' ').map(capitalize).join('');
  }

  addSnippet(snippet: Snippet) {
    this.snippets.add(snippet);
  }

}

export function sortedTags() {
  return [...allTags.values()].sort(sortBy(tag => tag.name));
}

function capitalize(str: string) {
  return str[0]?.toUpperCase() + str.slice(1);
}
