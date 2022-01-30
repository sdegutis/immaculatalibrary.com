import Yaml from 'js-yaml';
import { staticRouteFor } from '../util/static';
import { ViewPostPage } from '../pages/posts/one/one-post';
import { sortBy } from "../util/helpers";
import postsdir from '/data/posts/';

function loadContentFile<T>(file: FsFile) {
  const fileContents = file.text.replace(/\r\n/g, '\n');
  const fileContentsMatch = fileContents.match(/^---\n(.+?)\n---\n\n(.+?)$/s)!;
  const frontmatter = fileContentsMatch[1]!;
  const markdownContent = fileContentsMatch[2]!;

  const meta = Yaml.load(frontmatter!) as T;

  return { markdownContent, meta };
}

export class Post {
  static from(dir: FsDir) {
    const matchResults = dir.name.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/)!;
    const date = matchResults[1]!;
    const slug = matchResults[2]!;

    const file = dir.filesByName['content.md']!

    const data = loadContentFile<{
      draft: boolean,
      title: string,
      imageCaption: string,
    }>(file);

    return new Post(
      date,
      slug,
      data.markdownContent,
      data.meta.draft,
      data.meta.title,
      staticRouteFor(dir.filesByName['image-big.jpg']!),
      staticRouteFor(dir.filesByName['image-small.jpg']!),
      data.meta.imageCaption,
    );
  }

  view;

  public previewMarkdown;
  constructor(
    public date: string,
    public slug: string,
    public markdownContent: string,
    public draft: boolean,
    public title: string,
    public imageBig: string,
    public imageSmall: string,
    public imageCaption: string,
  ) {
    this.previewMarkdown = this.derivePreview(2000);

    this.view = new ViewPostPage(this);
  }

  private derivePreview(count: number) {
    const paragraphs = this.markdownContent.trim().split(/(\r?\n>+ *\r?\n)/);

    let running = 0;
    for (let i = 0; i < paragraphs.length; i++) {
      running += paragraphs[i]!.length;
      if (running > count) break;
    }

    if (running < this.markdownContent.length - 1) {
      return this.markdownContent.substring(0, running);
    }
    return null;
  }

}

export const allPosts = (postsdir
  .dirs.map(dir => Post.from(dir))
  .sort(sortBy(post => post.date)));

export const publishedPosts = (allPosts
  .filter(s => !s.draft)
  .reverse());
