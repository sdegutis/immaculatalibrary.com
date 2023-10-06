import { DataFile } from '../core/data-files';
import { sortBy } from '../core/helpers';
import allMovieFiles from "../data/movies/";

interface MovieFile {
  title: string;
  shortTitle: string;
  subtitle: string | undefined;
  year: string;
}

export class Movie extends DataFile<MovieFile> {

  route: string;
  imageBig: string;
  imageSmall: string;

  constructor(file: [string, Buffer]) {
    super(file);
    this.route = `/movies/${this.slug}.html`;
    this.imageBig = `/img/movies/${this.slug}-big.jpg`;
    this.imageSmall = `/img/movies/${this.slug}-small.jpg`;
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

export const allMovies = (allMovieFiles
  .map(file => new Movie(file))
  .sort(sortBy((m: Movie) => movieOrder.indexOf(m.slug))));
