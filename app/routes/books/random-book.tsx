import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable } from "../../core/router";
import { allBooks } from "../../model/models";

export const randomBookPage: Routeable = {
  route: '/random.html',
  method: 'GET',
  handle: () => {
    return {
      body: renderElement(<>
        <script>{`const pages = ${JSON.stringify(allBooks.map(book => book.view.route))}`}</script>
        <script>{`const i = Math.floor(Math.random() * pages.length); window.location = pages[i];`}</script>
      </>),
    };
  },
}

addRouteable(randomBookPage);
