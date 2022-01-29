import Yaml from 'js-yaml';
import { addRouteable, Routeable, RouteMethod } from '../core/router';
import { staticRouteFor } from '../core/static';
import { EnrichedInput } from '../pages/admin';
import { excerpt, format_date, md, reading_mins, sortBy } from "../util/helpers";
import { Container, Content, HeroImage } from '../view/components/page';
import { QuickLinks } from '../view/components/quicklinks';
import { Head, Html, SiteFooter, SiteHeader } from '../view/components/site';
import { referenceImage } from './category';
import postsdir from '/data/posts/';

function loadContentFile<T>(file: FsFile) {
  const fileContents = file.text.replace(/\r\n/g, '\n');
  const fileContentsMatch = fileContents.match(/^---\n(.+?)\n---\n\n(.+?)$/s)!;
  const frontmatter = fileContentsMatch[1]!;
  const markdownContent = fileContentsMatch[2]!;

  const meta = Yaml.load(frontmatter!) as T;

  return { markdownContent, meta };
}

export class Post implements Routeable {
  static from(dir: FsDir) {
    const matchResults = dir.name.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/)!;
    const date = matchResults[1]!;
    const slug = matchResults[2]!;

    const file = dir.filesByName['content.md']!

    const data = loadContentFile<{
      draft: boolean,
      title: string,
      imageFilename: string,
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

  get route() {
    return `/posts/${this.date}-${this.slug}.html`;
  }

  method: RouteMethod = 'GET';

  handle(input: EnrichedInput): RouteOutput {
    return {
      body: <Html>
        <Head title={this.title}>
          <link rel="stylesheet" href="/css/layout/post.css" />
        </Head>
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={this.imageBig} />
            <Container>
              <Content>
                <h1>{md.renderInline(this.title)}</h1>

                <p class="date">
                  {format_date(this.date)} &bull; {reading_mins(this.markdownContent)} min
                </p>

                {md.render(this.markdownContent)}
              </Content>
            </Container>
          </main>
          <QuickLinks />
          <SiteFooter input={input} />
        </body>
      </Html>
    }
  }

}

export const allPosts = (postsdir
  .dirs.map(dir => Post.from(dir))
  .sort(sortBy(post => post.route)));

export const publishedPosts = (allPosts
  .filter(s => !s.draft)
  .reverse());

export const allPostsPage: Routeable = {
  route: `/posts.html`,
  method: 'GET',
  handle: (input) => {
    const title = 'All Blog Posts';
    const image = referenceImage();
    return {
      body: <>
        <Html>
          <Head title={title}>
            <link rel="stylesheet" href="/css/layout/posts.css" />
          </Head>
          <body>
            <SiteHeader />
            <main>
              <HeroImage image={image} />
              <Container split={false}>

                <h1>{title}</h1>

                <ul class="all-blog-posts">
                  {publishedPosts.map(post => <>
                    <li class="post-row">
                      <a href={post.route}>
                        <img class="image" src={post.imageSmall} />
                      </a>
                      <div>
                        <a class="title" href={post.route}>
                          {post.title}
                        </a>
                        <span class="date">
                          {format_date(post.date)} &bull; {reading_mins(post.markdownContent)} min
                        </span>
                        <div class="excerpt">
                          {md.render(excerpt(post.markdownContent))}
                        </div>
                      </div>
                    </li>
                  </>)}
                </ul>

              </Container>
            </main>
            <QuickLinks />
            <SiteFooter input={input} />
          </body>
        </Html>
      </>
    };
  },
};

[
  allPostsPage,
  ...allPosts,
].forEach(addRouteable);
