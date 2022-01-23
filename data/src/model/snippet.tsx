import Yaml from 'js-yaml';
import { md, sortBy } from "../helpers";
import { Routeable } from '../router';
import { File } from "/../src/filesys";
import { RouteInput, RouteOutput } from "/../src/http";
import snippetsDir from '/data/snippets/';

class Snippet implements Routeable {

  static from(file: File) {
    const [, date, slug] = file.name.match(/^(\d{4}-\d{2}-\d{2})-(.+?).md$/)!;

    const fileContents = file.text.replace(/\r\n/g, '\n');
    const [, frontmatter, markdownContent] = fileContents.match(/^---\n(.+?)\n---\n\n(.+?)$/s)!;

    const meta = Yaml.load(frontmatter!) as {
      published: boolean,
      title: string,
      archiveLink: string,
      bookSlug: string,
    };

    return new Snippet(
      file,
      date!,
      slug!,
      markdownContent!,
      meta.published,
      meta.title,
      meta.archiveLink,
      meta.bookSlug,
    );
  }

  public previewMarkdown;
  constructor(
    private file: File,
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
    const header = Yaml.dump({
      published: this.published,
      title: this.title,
      archiveLink: this.archiveLink,
      bookSlug: this.bookSlug,
    }, {
      forceQuotes: true,
    });
    this.file.replace(Buffer.from(`---\n${header}---\n\n${this.markdownContent}`));
  }

  get route() {
    return `/book-snippets/${this.date}-${this.slug}.html`;
  }

  get(input: RouteInput): RouteOutput {
    return {
      body: <Html>
        <Head title={this.title} />
        <Body>
          <SiteHeader />
          {md.render(this.markdownContent)}
          <QuickLinks />
          <SiteFooter />
        </Body>
      </Html>
    }
  }

}

type Component = (attrs: Record<string, any>, children: any) => string;

const Head: Component = (attrs: { imagePath?: string, title?: string, description?: string }, children) => <>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>{attrs.title && `${attrs.title} - `}Immaculata Library</title>
    <meta property="og:title" content={'Immaculata Library' + (attrs.title ? `: ${attrs.title}` : '')} />
    <meta property="og:locale" content="en_US" />
    <meta property="og:image" content={`http://immaculatalibrary.com${attrs.imagePath}`} />
    <meta name="description" content={attrs.description ?? "Free Digital Catholic Books"} />

    <script src="/js/dark-mode.js"></script>
    <link rel="stylesheet" href="/css/base/base.css" />
    <link rel="stylesheet" href="/css/base/header.css" />
    <link rel="stylesheet" href="/css/base/footer.css" />
    <link rel="stylesheet" href="/css/base/fonts.css" />
    <link rel="stylesheet" href="/css/base/page-hero.css" />
    <link rel="stylesheet" href="/css/base/layout.css" />
    <link rel="stylesheet" href="/css/base/typography.css" />
    <link rel="stylesheet" href="/css/base/share.css" />

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-QNRF1FKVD7"></script>
    <script>
      {`window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'G-QNRF1FKVD7');`}
    </script>

    {children}
  </head>
</>;

const SiteHeader: Component = (attrs, children) => <>
  <header id="site-header">
    <nav class="container">
      <a href="/">Immaculata Library</a>
      <ul>
        <li>
          <ul>
            <li><a href="/about.html">About</a></li>
            <li><a href="/books.html">Books</a></li>
            <li><a href="/movies.html">Movies</a></li>
          </ul>
        </li>
        <li>
          <ul>
            <li><a href="/music.html">Music</a></li>
            <li><a href="/audio-bible.html">Audio Bible</a></li>
            <li><a href="/devotions.html">Devotions</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</>;

const SiteFooter: Component = (attrs, children) => <>
  <footer id="site-footer">
    <p>
      {new Date().getFullYear()} ImmaculataLibrary.com &copy; All Rights Reserved
      {' | '}
      <a href="mailto:immaculatalibrary@gmail.com">Contact</a>
      {' | '}
      <a href="#" id="dark-mode-toggle" data-lightmode="Light mode" data-darkmode="Dark mode"></a>
    </p>
  </footer>
  <script>
    {`for (const link of document.querySelectorAll('a[href^="https://archive.org/details/"]')) {
        link.target = '_blank';
      }`}
  </script>
</>;

const QuickLinks: Component = (attrs, children) => <>

  <div id="recents">
    <div class="container">

      {/* <h2>Blog Posts</h2>
              <p><a href="/posts.html">See all</a></p>

              <ul id="posts">

                {recentPosts.map(post => <>
                  <li class="post-box">
                    <a href={post.$route()}>
                      <img class="image" src={post.imageFilename} />
                    </a>
                    <a class="title" href={post.$route()}>
                      {post.title}
                    </a>
                    <span class="date">
                      {format_date(post.date)} &bull;  {reading_mins(post.content)} min
                    </span>
                    <div class="excerpt">
                      {markdown.render(excerpt(post.content))}
                    </div>
                  </li>

                </>)}
              </ul> */}

      <h2>Books</h2>
      <ul class="quicklinks">

        {$site.named('categories').$items.map(cat =>
          <li>
            <a class="link" href={cat.$route()} style={`background-image: url(/img/${cat.slug}.jpg);`}>
              <span>{cat.shortTitle}</span>
            </a>
          </li>
        )}

      </ul>

      <h2>Movies</h2>
      <ul class="quicklinks">

        {$site.named('movies').$items.map(movie =>
          <li>
            <a class="link" href={movie.$route()} style={`background-image: url(/img/movies/${movie.slug}-small.jpg);`}>
              <span>{movie.shortTitle}</span>
            </a>
          </li>
        )}

        <li>
          <a class="link" href="/audio-bible.html" style="background-image: url(/img/audiobible.png);">
            <span>Audio Bible</span>
          </a>
        </li>

      </ul>

    </div>
  </div>

</>;


const Body: Component = (attrs, children) => <>
  <body>
    {children}
  </body>
</>;

const Html: Component = (attrs, children) => <>
  {'<!DOCTYPE html>'}
  <html lang="en">
    {children}
  </html>
</>

export const allSnippets = (snippetsDir
  .files.map(file => Snippet.from(file))
  .sort(sortBy(s => s.date)));

export function publishedSnippets() {
  return allSnippets.filter(s => s.published);
}
