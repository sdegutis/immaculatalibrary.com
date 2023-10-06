import { sortBy } from '../core/helpers';
import { bookFromFile } from "./books";
import { categoryFromFile, categorySorter } from "./categories";
import { movieFromFile, movieSorter } from "./movies";
import { musicFromFile } from './musics';
import { snippetFromFile } from './snippets';

import allBookFiles from '../data/books/';
import allCategoryFiles from '../data/categories/';
import allMovieFiles from '../data/movies/';
import allMusicFiles from '../data/music/';
import allSnippetFiles from '../data/snippets/';

export const allMovies = (allMovieFiles
  .map(movieFromFile)
  .sort(movieSorter));

export const allBooks = (allBookFiles
  .map(bookFromFile)
  .sort(sortBy(b => `${b.dateAdded} ${b.slug}`)));

export const allCategories = (allCategoryFiles
  .map(categoryFromFile)
  .sort(categorySorter));

export const allMusics = (allMusicFiles
  .map(musicFromFile));

export const allSnippets = (allSnippetFiles
  .map(snippetFromFile)
  .filter((s => s.published))
  .sort(sortBy(s => s.slug))
  .reverse());

export const booksBySlug = Object.fromEntries(allBooks.map(book => [book.slug, book]));
export const categoriesBySlug = Object.fromEntries(allCategories.map(cat => [cat.slug, cat]));

for (const category of allCategories) {
  for (const bookSlug of category.books) {
    const book = booksBySlug[bookSlug]!;
    book.category = category;
    category.booksInCategory.push(book);
  }
}

for (const snippet of allSnippets) {
  const book = booksBySlug[snippet.bookSlug]!;
  snippet.book = book;
  book.snippets.push(snippet);
}

for (const book of allBooks) {
  book.snippets.sort(sortBy(s =>
    s.archivePage.startsWith('n')
      ? +s.archivePage.slice(1) - 1000
      : +s.archivePage));

  for (let i = 1; i < book.snippets.length; i++) {
    const s1 = book.snippets[i - 1];
    const s2 = book.snippets[i];
    s1!.nextSnippet = s2!;
    s2!.prevSnippet = s1!;
  }
}
