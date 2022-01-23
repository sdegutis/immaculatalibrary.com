import pagesDir from 'dir:/data/pages/';
import { md } from "../util/helpers";
import { Routeable } from '../router';
import { loadContentFile } from '../util/data-files';
import { Container, Content, HeroImage } from '../view/page';
import { QuickLinks } from '../view/quicklinks';
import { Head, Html, SiteFooter, SiteHeader } from '../view/site';
import { FsFile } from "/../src/filesys";
import { RouteInput, RouteOutput } from "/../src/http";

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

  get(input: RouteInput): RouteOutput {
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
          <SiteFooter />
        </body>
      </Html>
    }
  }

}

export const allPages = (pagesDir
  .files.map(file => Page.from(file)));
