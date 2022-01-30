import { ViewMovieRoute } from '../../pages/movies/view-movies/view-movies';
import { loadContentFile } from '../../util/data-files';
import { sortBy } from "../../util/helpers";
import { staticRouteFor } from '../../util/static';
import moviesDir from './data/';

export class Movie {

  static from(dir: FsDir) {
    const file = dir.filesByName['content.md']!;

    const data = loadContentFile<{
      title: string,
      shortTitle: string,
      subtitle: string | undefined,
      year: string,
    }>(file, 'slug');

    return new Movie(
      dir.name,
      data.markdownContent,
      data.meta.title,
      data.meta.shortTitle,
      data.meta.subtitle,
      data.meta.year,
      staticRouteFor(dir.filesByName['image-big.jpg']!),
      staticRouteFor(dir.filesByName['image-small.jpg']!),
    );
  }

  view;

  displayTitle;
  constructor(
    public slug: string,
    public markdownContent: string,
    public title: string,
    public shortTitle: string,
    public subtitle: string | undefined,
    public year: string,
    public bigImage: string,
    public smallImage: string,
  ) {
    this.displayTitle = `${this.title} (${this.year})`;
    this.view = new ViewMovieRoute(this);
  }

}

const movieOrder = [
  'passion-of-the-christ',
  'a-man-for-all-seasons',
  'a-man-for-all-seasons-charlton-heston',
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
  .dirs.map(dir => Movie.from(dir))
  .sort(sortBy(m => movieOrder.indexOf(m.slug))));
