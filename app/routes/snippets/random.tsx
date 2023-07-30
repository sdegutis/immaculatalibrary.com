import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable } from "../../core/router";
import { allSnippets } from "../../model/models";

export const randomSnippetPage: Routeable = {
  route: '/random-book-snippet.html',
  handle: () => {
    return {
      body: renderElement(<>
        <script>{`const pages = ${JSON.stringify(allSnippets.map(snippet => snippet.view.route))}`}</script>
        <script>{`const i = Math.floor(Math.random() * pages.length); window.location = pages[i];`}</script>
      </>),
    }
  },
};

addRouteable(randomSnippetPage);
