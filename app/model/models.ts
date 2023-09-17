import { sortBy } from '../util/helpers';
import { articleFromFile } from "./articles";
import { bookFromFile } from "./books";
import { categoryFromFile, categorySorter } from "./categories";
import { movieFromFile, movieSorter } from "./movies";
import { musicFromFile } from './musics';
import { snippetFromFile } from './snippets';

export const allMovies = ((require('/data/movies/') as FsDir).files
  .map(movieFromFile)
  .sort(movieSorter));

export const allArticles = ((require('/data/articles/') as FsDir).files
  .map(articleFromFile)
  .sort(sortBy(article => article.date))
  .filter(s => !s.draft)
  .reverse());

export const allBooks = ((require('/data/books/') as FsDir).files
  .map(bookFromFile)
  .sort(sortBy(b => `${b.dateAdded} ${b.slug}`)));

export const allCategories = ((require('/data/categories/') as FsDir).files
  .map(categoryFromFile)
  .sort(categorySorter));

export const allMusics = ((require('/data/music/') as FsDir).files
  .map(musicFromFile));

export const allSnippets = ((require('/data/snippets/') as FsDir).files
  .map(snippetFromFile)
  .filter((s => s.published))
  .sort(sortBy(s => s.slug))
  .reverse());

const booksBySlug = Object.fromEntries(allBooks.map(book => [book.slug, book]));

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
