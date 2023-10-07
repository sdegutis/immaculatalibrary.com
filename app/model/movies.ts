import { DataFile } from '../core/data-files';
import { sortBy } from '../core/helpers';
import allMovieFiles from "../data/movies/";

interface MovieFile {
  title: string;
  shortTitle: string;
  subtitle: string | undefined;
  year: string;
  sortOrder: number;
}

export class Movie extends DataFile<MovieFile> {

  static override modelDir = 'movies';

  route: string;
  imageBig: string;
  imageSmall: string;

  constructor(slug: string, content: string, data: MovieFile) {
    super(slug, content, data);
    this.route = `/movies/${this.slug}.html`;
    this.imageBig = `/img/movies/${this.slug}-big.jpg`;
    this.imageSmall = `/img/movies/${this.slug}-small.jpg`;
  }

}

export const allMovies = (allMovieFiles
  .map(file => Movie.fromFile(file))
  .sort(sortBy((m: Movie) => m.data.sortOrder)));
