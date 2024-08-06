import { allBooks } from "../../../_model/books.js";

export default allBooks.map(book => {
  return [book.slug, book.snippets.map(snippet => snippet.slug)];
});
