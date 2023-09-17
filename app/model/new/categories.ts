import categoriesDir from '../../data/categories/';
import { loadContentFile } from '../../util/data-files';
import { sortBy } from '../../util/helpers';

interface Category {
  title: string;
  shortTitle: string;
  books: string[];
}

export const allCategories = categoriesDir.files.map(file => loadContentFile<Category>(file, 'slug'));

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

allCategories.sort(sortBy(c => categoryOrder.indexOf(c.slug)));
