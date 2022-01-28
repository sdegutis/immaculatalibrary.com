import { addRouteable, Routeable, RouteMethod } from '../core/router';
import { EnrichedInput } from '../pages/admin';
import { loadContentFile } from '../util/data-files';
import { md } from "../util/helpers";
import { Container, Content, HeroImage } from '../view/components/page';
import { QuickLinks } from '../view/components/quicklinks';
import { Head, Html, SiteFooter, SiteHeader } from '../view/components/site';
import pagesDir from '/data/pages/';

export class Page implements Routeable {

  static from(file: FsFile) {
    const data = loadContentFile<{
      title: string,
      image: string,
    }>(file, 'slug');

    return new Page(
      data.slug,
      data.markdownContent,
      data.meta.title,
      data.meta.image,
    );
  }

  constructor(
    public slug: string,
    public markdownContent: string,
    public title: string,
    public imageFilename: string,
  ) { }

  get route() {
    return `/${this.slug}.html`;
  }

  method: RouteMethod = 'GET';

  handle(input: EnrichedInput): RouteOutput {
    return {
      body: <Html>
        <Head title={this.title}>
        </Head>
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={this.imageFilename} />
            <Container>
              <Content>
                <h1>{this.title}</h1>
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

export const allPages = (pagesDir
  .files.map(file => Page.from(file)));

allPages.forEach(addRouteable);
