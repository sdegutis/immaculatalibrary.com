import { loadContentFile } from '../core/data-files';

const PREVIEW_LENGTH = 2000;

export interface Article {
  date: string;
  slug: string;
  content: string;

  title: string;
  draft?: boolean;

  route: string;
  previewMarkdown: string | null;
}

export function articleFromFile(file: FsFile) {
  const data = loadContentFile<Article>(file);
  data.route = `/articles/${data.slug}.html`;
  data.previewMarkdown = derivePreview(data);
  return data;
}

function derivePreview(article: Article) {
  const paragraphs = article.content.trim().split(/(\r?\n>+ *\r?\n)/);

  let running = 0;
  for (let i = 0; i < paragraphs.length; i++) {
    running += paragraphs[i]!.length;
    if (running > PREVIEW_LENGTH) break;
  }

  if (running < article.content.length - 1) {
    return article.content.substring(0, running);
  }
  return null;
}
