import { ViewBookRoute } from '../../pages/books/one-book/view-book';
import { NewSnippetPage } from '../../pages/snippets/create/routes';
import { loadContentFile } from '../../util/data-files';
import { sortBy } from '../../util/helpers';
import { Category } from '../categories/category';
import { Snippet } from '../snippets/snippet';

export class Book {

  static from(file: FsFile) {
    const data = loadContentFile<{
      title: string,
      subtitle: string,
      dateAdded: string,
      author: string,
      translator: string,
      score: number,
      rating: number,
      files: {
        archiveId: string,
        pdfFile: string,
      }[],
      storeLinks: {
        link: string;
        image: string;
        title: string;
      }[],
    }>(file, 'slug');

    return new Book(
      data.slug,
      data.markdownContent,
      data.meta.title,
      data.meta.subtitle,
      data.meta.dateAdded,
      data.meta.author,
      data.meta.translator,
      data.meta.score,
      data.meta.rating,
      data.meta.files,
      data.meta.storeLinks,
    );
  }

  view;

  archiveFiles;

  constructor(
    public slug: string,
    public markdownContent: string,
    public title: string,
    public subtitle: string,
    public dateAdded: string,
    public author: string,
    public translator: string,
    public score: number,
    public rating: number,
    public files: {
      archiveId: string,
      pdfFile: string,
    }[],
    public storeLinks: {
      link: string;
      image: string;
      title: string;
    }[],
  ) {
    this.view = new ViewBookRoute(this);
    this.archiveFiles = this.files.map(file => ({
      ...file,
      page: new NewSnippetPage(file.archiveId, this.slug),
    }));
  }

  category!: Category;
  snippets: Snippet[] = [];

  sortAndConnectBookSnippets() {
    this.snippets.sort(sortBy(s =>
      s.archivePage.startsWith('n')
        ? +s.archivePage.slice(1) - 1000
        : +s.archivePage));
    for (let i = 1; i < this.snippets.length; i++) {
      const s1 = this.snippets[i - 1];
      const s2 = this.snippets[i];
      s1!.nextSnippet = s2!;
      s2!.prevSnippet = s1!;
    }
  }

}
