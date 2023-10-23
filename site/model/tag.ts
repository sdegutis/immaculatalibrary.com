import { sortBy } from "../core/helpers.js";

export const allTags = new Map<string, Tag>();

export class Tag {

  static getOrCreate(name: string) {
    let tag = allTags.get(name);
    if (!tag) allTags.set(name, tag = new Tag(name));
    return tag;
  }

  oneword;
  route;

  constructor(public name: string) {
    this.oneword = this.name.split(' ').map(capitalize).join('');
    this.route = `/book-snippets/tag/${this.oneword.toLowerCase()}.html`;
  }

}

export function sortedTags() {
  return [...allTags.values()].sort(sortBy(tag => tag.name));
}

function capitalize(str: string) {
  return str[0]?.toUpperCase() + str.slice(1);
}
