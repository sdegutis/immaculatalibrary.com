import articlesDir from '../../data/articles/';
import booksDir from '../../data/books/';
import categoriesDir from '../../data/categories/';
import moviesDir from '../../data/movies/';
import musicDir from '../../data/music/';
import snippetsDir from '../../data/snippets/';
import { articleFromFile } from "./articles";
import { bookFromFile } from "./books";
import { categoryFromFile, categorySorter } from "./categories";
import { movieFromFile, movieSorter } from "./movies";
import { musicFromFile } from './musics';
import { snippetFromFile } from './snippets';

export const allMovies = moviesDir.files.map(movieFromFile).sort(movieSorter);
export const allArticles = articlesDir.files.map(articleFromFile);
export const allBooks = booksDir.files.map(bookFromFile);
export const allCategories = categoriesDir.files.map(categoryFromFile).sort(categorySorter);
export const allMusics = musicDir.files.map(musicFromFile);
export const allSnippets = snippetsDir.files.map(snippetFromFile);
