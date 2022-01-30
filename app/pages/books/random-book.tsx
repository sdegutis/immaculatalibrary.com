import { addRouteable, Routeable } from "../../core/router";
import { allBooks } from "../../model/models";
import { randomElement } from "../../util/helpers";

const randomBookPage: Routeable = {
  route: '/random.html',
  method: 'GET',
  handle: (input) => {
    const book = randomElement(allBooks);
    return {
      status: 302,
      headers: { 'Location': book.view.route },
    };
  },
}

addRouteable(randomBookPage);
