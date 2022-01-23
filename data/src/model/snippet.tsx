import snippetsDir from 'dir:/data/snippets/';
import { Routeable } from '../router';
import { loadContentFile, saveContentFile } from '../util/data-files';
import { format_date, md, reading_mins, sortBy } from "../util/helpers";
import { Container, Content, HeroImage } from '../view/page';
import { QuickLinks } from '../view/quicklinks';
import { Head, Html, SiteFooter, SiteHeader } from '../view/site';
import { Component } from '../view/types';
import { Book } from './book';
import { FsFile } from "/../src/filesys";
import { RouteInput, RouteOutput } from "/../src/http";

export class Snippet implements Routeable {
  static from(file: FsFile) {
    const data = loadContentFile<{
      published: boolean,
      title: string,
      archiveLink: string,
      bookSlug: string,
    }>(file, 'date-slug');

    return new Snippet(
      file,
      data.date,
      data.slug,
      data.markdownContent,
      data.meta.published,
      data.meta.title,
      data.meta.archiveLink,
      data.meta.bookSlug,
    );
  }

  public previewMarkdown;
  constructor(
    private file: FsFile,
    public date: string,
    public slug: string,
    public markdownContent: string,
    public published: boolean,
    public title: string,
    public archiveLink: string,
    public bookSlug: string,
  ) {
    this.previewMarkdown = this.derivePreview(2000);
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

  save() {
    saveContentFile(this.file, {
      published: this.published,
      title: this.title,
      archiveLink: this.archiveLink,
      bookSlug: this.bookSlug,
    }, this.markdownContent);
  }

  get route() {
    return `/book-snippets/${this.date}-${this.slug}.html`;
  }

  book!: Book;

  get image() {
    return this.book.category.imageFilename;
  }

  get(input: RouteInput): RouteOutput {
    return {
      body: <Html>
        <Head title={this.title} />
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={this.image} />
            <Container>
              <Content>
                <h1>{this.title}</h1>
                {md.render(this.markdownContent)}
              </Content>
            </Container>
          </main>
          <QuickLinks />
          <SiteFooter />
        </body>
      </Html>
    }
  }

}

export const allSnippets = (snippetsDir
  .files.map(file => Snippet.from(file))
  .sort(sortBy(s => s.date)));

export const publishedSnippets = (allSnippets
  .filter(s => s.published)
  .sort(sortBy(s => s.date))
  .reverse());










function groupByDate(snippets: Snippet[]) {
  const groups: Record<string, Snippet[]> = Object.create(null);
  for (const s of snippets) {
    const d = format_date(s.date);
    if (!groups[d]) groups[d] = [];
    groups[d]!.push(s);
  }
  return groups;
}

const latestBookSnippetsStyle = `
ul.snippets-latest {
  padding-left: 0;
}

ul.snippets-latest > li {
  list-style-type: none;
}

ul.snippets-latest > li ul {
  padding-left: 20px;
}

ul.snippets-latest > li li {
  list-style-type: disc;
}
`;

export const LatestBookSnippets: Component<{}> = (attrs, children) => {

  const recentBookSnippets = publishedSnippets.slice(0, 9);
  const groups = Object.entries(groupByDate(recentBookSnippets));

  return <>
    <style>{latestBookSnippetsStyle}</style>

    <h3>Latest book snippets</h3>
    <p>
      <a href="/book-snippets.html">See all {publishedSnippets.length}</a>
      {' | '}
      <a href='/random-book-snippet.html'>Random Book Snippet</a>
    </p>
    <ul class="snippets-latest">
      {groups.map(([date, group]) => <>
        <li>
          <h4>{format_date(date)}</h4>
          <ul>
            {group.map(snippet => <>
              <li>
                <p>
                  <a href={snippet.route}>{md.renderInline(snippet.title)}</a>
                  <br /> {reading_mins(snippet.markdownContent)} min &mdash; {snippet.book.title}
                </p>
              </li>
            </>)}
          </ul>
        </li>
      </>)}
    </ul>

  </>;
};
