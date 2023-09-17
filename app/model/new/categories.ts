import categoriesDir from '../../data/categories/';
import { loadContentFile } from '../../util/data-files';
import { sortBy } from '../../util/helpers';

export const allCategories = categoriesDir.files.map(file => {
  const slug = file.name.slice(0, -3);
  const data = loadContentFile<{
    title: string,
    shortTitle: string,
    books: string[],
  }>(file, 'slug');
  return { ...data, slug };
});

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
