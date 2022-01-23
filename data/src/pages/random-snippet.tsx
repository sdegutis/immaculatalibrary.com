import { Routeable } from "../core/router";
import { allSnippets } from "../model/snippet";
import { randomElement } from "../util/helpers";

export const randomSnippetPage: Routeable = {
  route: '/random-book-snippet.html',
  get: (input) => {
    const snippet = randomElement(allSnippets);
    return {
      status: 302,
      headers: { 'Location': snippet.route },
    }
  },
}
