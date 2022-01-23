import moviesDir from 'dir:/data/movies/';
import { md, shareLinks, sortBy } from "../util/helpers";
import { Routeable } from '../router';
import { loadContentFile } from '../util/data-files';
import { Container, Content, HeroImage } from '../view/page';
import { QuickLinks } from '../view/quicklinks';
import { Head, Html, SiteFooter, SiteHeader } from '../view/site';
import { FsFile } from "/../src/filesys";
import { RouteInput, RouteOutput } from "/../src/http";

export class Movie implements Routeable {

  static from(file: FsFile) {
    const data = loadContentFile<{
      title: string,
      shortTitle: string,
      year: string,
      imageFilename: string,
    }>(file, 'slug');

    return new Movie(
      data.slug,
      data.markdownContent,
      data.meta.title,
      data.meta.shortTitle,
      data.meta.year,
      data.meta.imageFilename,
    );
  }

  displayTitle;
  constructor(
    public slug: string,
    public markdownContent: string,
    public title: string,
    public shortTitle: string,
    public year: string,
    public imageFilename: string,
  ) {
    this.displayTitle = `${this.title} (${this.year})`;
  }

  get route() {
    return `/movies/${this.slug}.html`;
  }

  get(input: RouteInput): RouteOutput {
    return {
      body: <Html>
        <Head title={this.displayTitle}>
        </Head>
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={this.imageFilename} />
            <Container>
              <Content>
                <h1>{this.displayTitle}</h1>
                {md.render(this.markdownContent)}
                {shareLinks}
              </Content>
              <div>
                <ul>
                  {allMovies.map(movie => <li>
                    <a href={movie.route}>{movie.title}</a> ({movie.year})
                  </li>)}
                </ul>
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

const movieOrder = [
  'passion-of-the-christ',
  'a-man-for-all-seasons',
  'saints-and-heroes',
  'ignatius-of-loyola',
  'our-gods-brother',
  'blessed-duns-scotus',
  'the-13th-day',
  'bernadette',
  'saint-maria-soledad',
  'st-pedro-poveda',
  'don-bosco',
  'flowers-of-st-francis',
  'the-jewellers-shop',
  'monsieur-vincent',
  'miracle-of-saint-therese',
  'restless-heart',
  'the-passion-of-joan-of-arc',
  'mother-teresa',
  'passion-of-bernadette',
  'padre-pio',
  'john-xxiii-pope-of-peace',
  'paul-vi-pope-in-the-tempest',
  'pope-john-paul-ii',
  'saint-john-baptist-de-la-salle',
];

export const allMovies = (moviesDir
  .files.map(file => Movie.from(file))
  .sort(sortBy(m => movieOrder.indexOf(m.slug))));
