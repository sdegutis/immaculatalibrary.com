import { getFiles } from '../../data.js'
import { DataFileWithDate } from '../util/_datafiles.js'
import { sortBy } from '../util/_helpers.js'
import { calculateReadingMins } from '../util/helpers.js'

const allArticleFiles = getFiles('/data/articles/', import.meta.url)

interface ArticleFile {
  title: string
  break?: boolean
  draft?: boolean
  imageFilename?: string
  imageCaption?: string
}

export class Article extends DataFileWithDate<ArticleFile> {

  static override modelDir = 'articles';

  mins: number
  route: string

  constructor(slug: string, content: string, data: ArticleFile) {
    super(slug, content, data)
    this.route = `/articles/${this.slug}.html`
    this.mins = calculateReadingMins(this.content)
    this.data.break ??= true
  }

}

export const allArticles = (allArticleFiles
  .map(file => Article.fromFile(file))
  .sort(sortBy(article => article.date))
  .filter(s => !s.data.draft)
  .reverse())
