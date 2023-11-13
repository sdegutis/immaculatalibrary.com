import { sortBy } from "../core/helpers.js";

export const allTags = new Map<string, Tag>();

export class Tag {

  static getOrCreate(name: string) {
    let tag = allTags.get(name);
    if (!tag) allTags.set(name, tag = new Tag(name));
    return tag;
  }

  constructor(public name: string) { }

}

export function sortedTags() {
  return [...allTags.values()].sort(sortBy(tag => tag.name));
}
