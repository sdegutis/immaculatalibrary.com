import postsdir from 'dir:/data/posts/';
import { Routeable } from '../core/router';
import { EnrichedInput } from '../pages/admin';
import { loadContentFile } from '../util/data-files';
import { excerpt, format_date, md, reading_mins, ShareLinks, sortBy } from "../util/helpers";
import { Container, Content, HeroImage } from '../view/page';
import { QuickLinks } from '../view/quicklinks';
import { Head, Html, SiteFooter, SiteHeader } from '../view/site';
import { FsFile } from "/src/filesys";
import { RouteOutput } from "/src/http";

export class Post implements Routeable {
  static from(file: FsFile) {
    const data = loadContentFile<{
      draft: boolean,
      title: string,
      imageFilename: string,
      imageCaption: string,
    }>(file, 'date-slug');

    return new Post(
      data.date,
      data.slug,
      data.markdownContent,
      data.meta.draft,
      data.meta.title,
      data.meta.imageFilename,
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
    public imageFilename: string,
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

  get(input: EnrichedInput): RouteOutput {
    return {
      body: <Html>
        <Head title={this.title}>
          <link rel="stylesheet" href="/css/layout/post.css" />
        </Head>
        <body>
          <SiteHeader input={input} />
          <main>
            <HeroImage image={this.imageFilename} />
            <Container>
              <Content>
                <h1>{md.renderInline(this.title)}</h1>

                <p class="date">
                  {format_date(this.date)} &bull; {reading_mins(this.markdownContent)} min
                </p>

                {md.render(this.markdownContent)}

                <ShareLinks />
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

export const allPosts = (postsdir
  .files.map(file => Post.from(file))
  .sort(sortBy(post => post.route)));

export const publishedPosts = (allPosts
  .filter(s => !s.draft)
  .reverse());

export const allPostsPage: Routeable = {
  route: `/posts.html`,
  get: (input) => {
    const title = 'All Blog Posts';
    const image = '/img/reference-big.jpg';
    return {
      body: <>
        <Html>
          <Head title={title}>
            <link rel="stylesheet" href="/css/layout/posts.css" />
          </Head>
          <body>
            <SiteHeader input={input} />
            <main>
              <HeroImage image={image} />
              <Container split={false}>

                <h1>{title}</h1>

                <ul class="all-blog-posts">
                  {publishedPosts.map(post => <>
                    <li class="post-row">
                      <a href={post.route}>
                        <img class="image" src={post.imageFilename} />
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
            <SiteFooter />
          </body>
        </Html>
      </>
    };
  },
};

export const postRoutes: Routeable[] = [
  allPostsPage,
  ...allPosts,
];
