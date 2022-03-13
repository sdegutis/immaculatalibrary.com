import { ViewTagRoute } from "../../routes/snippets/tag";
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
    this.slug = this.name.replace(/ /g, '');
    this.view = new ViewTagRoute(this);
  }

  addSnippet(snippet: Snippet) {
    this.snippets.add(snippet);
  }

  removeSnippet(snippet: Snippet) {
    this.snippets.delete(snippet);
  }

}
