import { loadContentFile } from '../../util/data-files';

export interface Snippet {
  date: string;
  slug: string;
  content: string;

  published: boolean;
  title: string;
  archiveSlug: string;
  archivePage: string;
  bookSlug: string;
  tags: string[];
}

export function snippetFromFile(file: FsFile) {
  const data = loadContentFile<Snippet>(file);
  return data;
}

// ) {
//   this.previewMarkdown = this.derivePreview(2000);

//   this.book = allBooks.find(book => book.slug.includes(this.bookSlug))!;
//   this.book.snippets.push(this);

//   this.tags = new Set([...tags].map(Tag.getOrCreate));
//   for (const tag of this.tags) {
//     tag.addSnippet(this);
//   }

//   allSnippets?.unshift(this);

//   this.renderedBody = markdown.render(this.markdownContent);
//   this.renderedTitle = markdown.renderInline(this.title);
// }

// get archiveLink() {
//   return `https://archive.org/details/${this.archiveSlug}/page/${this.archivePage}?view=theater`;
// }

// private derivePreview(count: number) {
//   const paragraphs = this.markdownContent.trim().split(/(\r?\n>+ *\r?\n)/);

//   let running = 0;
//   for (let i = 0; i < paragraphs.length; i++) {
//     running += paragraphs[i]!.length;
//     if (running > count) break;
//   }

//   if (running < this.markdownContent.trim().length - 1) {
//     return this.markdownContent.substring(0, running);
//   }
//   return null;
// }

// get image() {
//   return this.book.category.imageBig;
// }

