import { Routeable } from "../core/router";
import { allBooks } from "./book";
import { randomElement } from "../util/helpers";

export const randomBookPage: Routeable = {
  route: '/random.html',
  method: 'GET',
  handle: (input) => {
    const book = randomElement(allBooks);
    return {
      status: 302,
      headers: { 'Location': book.route },
    };
  },
}
