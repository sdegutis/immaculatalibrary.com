import { addRouteable, Routeable } from "../../core/router";
import { allSnippets } from "../../model/models";
import { randomElement } from "../../util/helpers";

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
};

addRouteable(randomSnippetPage);
