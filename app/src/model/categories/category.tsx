import { staticRouteFor } from '../../util/static';
import { ViewCategory } from '../../pages/category/view-category';
import { loadContentFile } from '../../util/data-files';
import { sortBy } from "../../util/helpers";
import { Book } from '../books/book';
import categoriesDir from '/data/categories/';

export class Category {

  static from(dir: FsDir) {
    const file = dir.filesByName['content.md']!;

    const data = loadContentFile<{
      title: string,
      shortTitle: string,
      books: string[],
    }>(file, 'slug');

    const imageBig = staticRouteFor(dir.filesByName['image-big.jpg']!);
    const imageSmall = staticRouteFor(dir.filesByName['image-small.jpg']!);

    return new Category(
      dir.name,
      data.markdownContent,
      data.meta.title,
      data.meta.shortTitle,
      imageBig,
      imageSmall,
      new Set(data.meta.books),
    );
  }

  view;

  books: Book[] = [];

  constructor(
    public slug: string,
    public markdownContent: string,
    public title: string,
    public shortTitle: string,
    public imageBig: string,
    public imageSmall: string,
    public bookSlugs: Set<string>,
  ) {
    this.view = new ViewCategory(this);
  }

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

export const allCategories = (categoriesDir
  .dirs.map(dir => Category.from(dir))
  .sort(sortBy(c => categoryOrder.indexOf(c.slug))));
