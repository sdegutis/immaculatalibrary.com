import { sortBy } from '../util/helpers';
import { Book } from './books/book';
import booksDir from './books/data/';
import { Category } from './categories/category';
import categoriesDir from './categories/data/';
import moviesDir from './movies/data/';
import { Movie } from './movies/movie';
import postsDir from './posts/data/';
import { Post } from './posts/post';
import snippetsDir from './snippets/data/';
import { Snippet } from './snippets/snippet';

const categoryOrder = [
  'classics',
  'devotion',
  'instruction',
  'reference',
  'saints',
  'mary',
  'joseph',
  'apologetics',
  'blessed-sacrament',
  'sacred-heart',
  'holy-spirit',
  'lourdes',
  'st-francis-de-sales',
  'st-alphonsus-de-liguori',
  'st-catherine-of-siena',
  'st-teresa-of-avila',
  'st-john-of-the-cross',
  'st-john-henry-newman',
  'st-thomas-more',
  'st-thomas-aquinas',
  'st-louis-de-montfort',
  'jesuits',
  'fr-lasance',
];

const movieOrder = [
  'passion-of-the-christ',
  'a-man-for-all-seasons',
  'a-man-for-all-seasons-charlton-heston',
  'saints-and-heroes',
  'ignatius-of-loyola',
  'our-gods-brother',
  'blessed-duns-scotus',
  'the-13th-day',
  'bernadette',
  'saint-maria-soledad',
  'st-pedro-poveda',
  'don-bosco',
  'flowers-of-st-francis',
  'the-jewellers-shop',
  'monsieur-vincent',
  'miracle-of-saint-therese',
  'restless-heart',
  'the-passion-of-joan-of-arc',
  'mother-teresa',
  'passion-of-bernadette',
  'padre-pio',
  'john-xxiii-pope-of-peace',
  'paul-vi-pope-in-the-tempest',
  'pope-john-paul-ii',
  'saint-john-baptist-de-la-salle',
];

export const allBooks = (booksDir
  .files.map(file => Book.from(file))
  .sort(sortBy(b => `${b.dateAdded} ${b.slug}`)));

export const allSnippets = (snippetsDir
  .files.map(file => Snippet.from(file))
  .sort(sortBy(s => s.view.route))
  .filter(s => s.published)
  .reverse());

export const allCategories = (categoriesDir
  .dirs.map(dir => Category.from(dir))
  .sort(sortBy(c => categoryOrder.indexOf(c.slug))));

export const allMovies = (moviesDir
  .dirs.map(dir => Movie.from(dir))
  .sort(sortBy(m => movieOrder.indexOf(m.slug))));

export const allPosts = (postsDir
  .dirs.map(dir => Post.from(dir))
  .sort(sortBy(post => post.date))
  .filter(s => !s.draft)
  .reverse());
