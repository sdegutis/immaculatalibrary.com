import { getFiles } from "../../data.js"
import { DataFile } from '../util/_datafiles.js'
import { sortBy } from '../util/_helpers.js'
import { Book } from './books.js'
import * as relations from './relations.js'

const allCategoryFiles = getFiles('/data/categories/', import.meta.url)

interface CategoryFile {
  title: string
  saint?: true
  shortTitle: string
  books: string[]
  sortOrder: number
}

export class Category extends DataFile<CategoryFile> {

  static override modelDir = 'categories';

  route: string
  imageBig: string
  imageSmall: string

  constructor(slug: string, content: string, data: CategoryFile) {
    super(slug, content, data)
    this.route = `/books/category/${this.slug}.html`
    this.imageBig = `/img/categories/${this.slug}-big.jpg`
    this.imageSmall = `/img/categories/${this.slug}-small.jpg`
  }

  get books(): Book[] {
    return relations.categories().books.get(this)!
  }

}

export const allCategories = (allCategoryFiles
  .map(file => Category.fromFile(file))
  .sort(sortBy(c => c.data.sortOrder)))

export const categoriesBySlug = Object.fromEntries(allCategories.map(cat => [cat.slug, cat]))
