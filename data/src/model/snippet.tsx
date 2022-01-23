import snippetsDir from 'dir:/data/snippets/';
import { LatestBookSnippets } from '../components/latest-snippets';
import { Routeable } from '../core/router';
import { loadContentFile, saveContentFile } from '../util/data-files';
import { format_date, groupByDate, md, reading_mins, sortBy } from "../util/helpers";
import { Container, Content, HeroImage } from '../view/page';
import { QuickLinks } from '../view/quicklinks';
import { Head, Html, SiteFooter, SiteHeader } from '../view/site';
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
              <div>
                <LatestBookSnippets />
              </div>
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

export const allSnippetsPage: Routeable = {
  route: `/book-snippets.html`,
  get: (input) => {

    const title = 'Book Snippets';
    const image = '/img/reference-big.jpg';
    const groups = Object.entries(groupByDate(publishedSnippets));

    return {
      body: <>
        <Html>
          <Head title={title}>
            <script src="/js/search-book-snippets.js" defer></script>
            <link rel="stylesheet" href="/css/layout/book-snippets.css" />
          </Head>
          <body>
            <SiteHeader />
            <main>
              <HeroImage image={image} />
              <Container>
                <Content>

                  <h1>{title}</h1>

                  <p>
                    Not sure what to read?<br />
                    Try a <a href="/random-book-snippet.html" target="_blank">Random Book Snippet</a>.</p>
                  <hr />

                  <p>
                    Search:<br />
                    <input type="text" id="search-book-snippets-field" />
                  </p>

                  <div id="search-results"></div>
                  <hr />

                  <ul id="snippets-all">
                    {groups.map(([date, group]) => <>
                      <li>
                        <h4>{format_date(date)}</h4>
                        <ul>
                          {group.map(snippet => <>
                            <li class="snippet">
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

                </Content>
              </Container>
            </main>
            <QuickLinks />
            <SiteFooter />
          </body>
        </Html>
      </>
    };
  },
};

export const bookSnippetSearch: Routeable = {
  route: '/book-snippets/search',
  post: (input) => {
    const searchTerm = JSON.parse(input.body.toString('utf8')).searchTerm.toLowerCase();

    const snippets = publishedSnippets.filter(s => {
      if (s.markdownContent.toLowerCase().includes(searchTerm)) return true;
      if (s.title.toLowerCase().includes(searchTerm)) return true;
      if (s.book.title.toLowerCase().includes(searchTerm)) return true;
      if (s.book.author.toLowerCase().includes(searchTerm)) return true;
      return false;
    });

    return {
      body: JSON.stringify(snippets.map(snippet => ({
        title: md.renderInline(snippet.title),
        bookTitle: snippet.book.title,
        url: snippet.route,
        formattedDate: format_date(snippet.date),
        readingMins: reading_mins(snippet.markdownContent),
      })))
    };
  }
};
