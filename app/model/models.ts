import { sortBy } from '../core/helpers';
import { bookFromFile } from "./books";
import { categoryFromFile, categorySorter } from "./categories";
import { musicFromFile } from './musics';
import { snippetFromFile } from './snippets';

import allBookFiles from '../data/books/';
import allCategoryFiles from '../data/categories/';
import allMusicFiles from '../data/music/';
import allSnippetFiles from '../data/snippets/';

export const allBooks = (allBookFiles
  .map(bookFromFile)
  .sort(sortBy(b => `${b.data.dateAdded} ${b.data.slug}`)));

export const allCategories = (allCategoryFiles
  .map(categoryFromFile)
  .sort(categorySorter));

export const allMusics = (allMusicFiles
  .map(musicFromFile));

export const allSnippets = (allSnippetFiles
  .map(snippetFromFile)
  .filter((s => s.data.published))
  .sort(sortBy(s => s.data.slug))
  .reverse());

export const booksBySlug = Object.fromEntries(allBooks.map(book => [book.data.slug, book]));
export const categoriesBySlug = Object.fromEntries(allCategories.map(cat => [cat.data.slug, cat]));

for (const category of allCategories) {
  for (const bookSlug of category.data.books) {
    const book = booksBySlug[bookSlug]!;
    book.category = category;
    category.booksInCategory.push(book);
  }
}

for (const snippet of allSnippets) {
  const book = booksBySlug[snippet.data.bookSlug]!;
  snippet.book = book;
  book.snippets.push(snippet);
}

for (const book of allBooks) {
  book.snippets.sort(sortBy(s =>
    s.data.archivePage.startsWith('n')
      ? +s.data.archivePage.slice(1) - 1000
      : +s.data.archivePage));

  for (let i = 1; i < book.snippets.length; i++) {
    const s1 = book.snippets[i - 1];
    const s2 = book.snippets[i];
    s1!.nextSnippet = s2!;
    s2!.prevSnippet = s1!;
  }
}
