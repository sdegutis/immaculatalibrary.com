import { DataFileWithoutDate, loadContentFile, sortBy } from '../core/helpers';

interface MovieFile extends DataFileWithoutDate {
  title: string;
  shortTitle: string;
  subtitle: string | undefined;
  year: string;
}

export class Movie {

  route: string;
  imageBig: string;
  imageSmall: string;

  constructor(public data: MovieFile) {
    this.route = `/movies/${data.slug}.html`;
    this.imageBig = `/img/movies/${data.slug}-big.jpg`;
    this.imageSmall = `/img/movies/${data.slug}-small.jpg`;
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

export const movieSorter = sortBy((m: Movie) => movieOrder.indexOf(m.data.slug));

export function movieFromFile(file: [string, Buffer]): Movie {
  return new Movie(loadContentFile<MovieFile>(file));
}
