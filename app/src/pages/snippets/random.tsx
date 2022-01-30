import { Routeable } from "../../core/router";
import { randomElement } from "../../util/helpers";
import { allSnippets } from "../../model/snippet";

export const randomSnippetPage: Routeable = {
  route: '/random-book-snippet.html',
  method: 'GET',
  handle: (input) => {
    const snippet = randomElement(allSnippets);
    return {
      status: 302,
      headers: { 'Location': snippet.view.route },
    }
  },
}
