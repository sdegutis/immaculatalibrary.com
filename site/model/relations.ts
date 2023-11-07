import { Book, allBooks, booksBySlug } from "./books.js";
import { Category, allCategories } from "./categories.js";
import { Snippet, allSnippets } from "./snippets.js";

export function categories() {
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

  return { books, forBook };
}

export function snippets() {
  const inBook = new Map<Book, Snippet[]>();
  const book = new Map<Snippet, Book>();

  for (const book of allBooks) {
    inBook.set(book, []);
  }

  for (const snippet of allSnippets) {
    const bookForSnippet = booksBySlug[snippet.data.bookSlug]!;
    book.set(snippet, bookForSnippet);
    inBook.get(bookForSnippet)!.push(snippet);
  }

  return { inBook, book };
}
