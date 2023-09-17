import { loadContentFile } from '../util/data-files';
import { sortBy } from '../util/helpers';

export interface Category {
  slug: string;
  content: string;

  title: string;
  shortTitle: string;
  books: string[];

  imageBig: string;
  imageSmall: string;
}

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

export const categorySorter = sortBy((c: Category) => categoryOrder.indexOf(c.slug));

export function categoryFromFile(file: FsFile) {
  const data = loadContentFile<Category>(file);
  data.imageBig = `/img/categories/${data.slug}-big.jpg`;
  data.imageSmall = `/img/categories/${data.slug}-small.jpg`;
  return data;
}

// for (const bookSlug of this.bookSlugs) {
//   const book = allBooks.find(book => book.slug === bookSlug)!;
//   this.books.push(book);
//   book.category = this;
// }
