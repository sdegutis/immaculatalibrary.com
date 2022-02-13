import { ViewMovieRoute } from '../../routes/movies/view-movies/view-movies';
import { loadContentFile } from '../../util/data-files';
import { staticRouteFor } from '../../util/static';

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
