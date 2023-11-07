import { Book, allBooks, booksBySlug } from "./books.js";
import { Category, allCategories } from "./categories.js";
import { Snippet, allSnippets } from "./snippets.js";

function lazy<T>(fn: () => T): () => T {
  let data: T;
  return () => {
    if (!data) data = fn();
    return data;
  }
}

export const categories = lazy(() => {
  const books = new Map<Category, Book[]>();
  const forBook = new Map<Book, Category>();

  for (const category of allCategories) {
    for (const bookSlug of category.data.books) {
      const book = booksBySlug[bookSlug]!;
      forBook.set(book, category);

      let booksInCategory = books.get(category);
      if (!booksInCategory) books.set(category, booksInCategory = []);
      booksInCategory.push(book);
    }
  }

  return { booksInCategory: books, categoryForBook: forBook };
});

export const snippets = lazy(() => {
  const snippetsInBook = new Map<Book, Snippet[]>();
  const bookForSnippet = new Map<Snippet, Book>();

  for (const book of allBooks) {
    snippetsInBook.set(book, []);
  }

  for (const snippet of allSnippets) {
    const book = booksBySlug[snippet.data.bookSlug]!;
    bookForSnippet.set(snippet, book);
    snippetsInBook.get(book)!.push(snippet);
  }

  return { snippetsInBook, bookForSnippet };
});
