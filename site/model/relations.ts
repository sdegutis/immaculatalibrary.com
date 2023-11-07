import { Book, allBooks, booksBySlug } from "./books.js";
import { Category, allCategories } from "./categories.js";
import { Snippet, allSnippets } from "./snippets.js";

const cache = new Map<Function, any>();
export function cached<T>(fn: () => T): T {
  let data = cache.get(fn);
  if (!data) cache.set(fn, data = fn());
  return data;
}

export const categories = (() => {
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

export const snippets = (() => {
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
