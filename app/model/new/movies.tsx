import moviesDir from '../../data/movies/';
import { loadContentFile } from '../../util/data-files';
import { sortBy } from '../../util/helpers';

export const allMovies = moviesDir.files.map(file => {
  const slug = file.name.slice(0, -3);
  const data = loadContentFile<{
    title: string,
    shortTitle: string,
    subtitle: string | undefined,
    year: string,
  }>(file, 'slug');
  return { ...data, slug, displayTitle: `${data.meta.title} (${data.meta.year})` };
});

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

allMovies.sort(sortBy(m => movieOrder.indexOf(m.slug)));
