import { Book, allBooks } from "../../model/books.js";

function bookToJson(book: Book) {
  return {
    empty: book.snippets.length === 0,
    stars: book.data.rating,
    route: book.route,
    title: book.data.title,
    author: book.data.author,
    description: book.content,
    categories: book.categories.map(cat => cat.data.title),
  };
}

export type BookJson = ReturnType<typeof bookToJson>;

export default <>
  {JSON.stringify(allBooks.map(bookToJson))}
</>;
