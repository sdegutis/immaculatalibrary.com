import * as fs from "fs";
import Yaml from 'js-yaml';

const items: any[] = (Object.entries<any>(
  require('../imlib-backup-2022-01-18T13_31_41.688Z.json'))
  .map(([$id, data]) => ({ $id, ...data }))
);

const staticItems = (items
  .filter(it => !it.$boot && it.$type === '73c941de-a7e9-4bce-98b1-9bb59ef57b65')
);

const movieItems = (items
  .filter(it => it.$type === '10a9ab1a-0665-4905-8c5c-2410739a7ad8')
  .sort((a, b) =>
    a.sortOrder < b.sortOrder ? -1 :
      a.sortOrder > b.sortOrder ? 1 :
        0)
);

// importPublic();
// importMovies();

function importPublic() {
  for (const item of staticItems) {
    const buffer = Buffer.from(item.content, item.base64 ? 'base64' : 'utf8');
    fs.writeFileSync('data/public/' + item.path, buffer);
  }
}

function importMovies() {
  for (const item of movieItems) {
    // console.log('hmm')
    // const buffer = Buffer.from(item.content, item.base64 ? 'base64' : 'utf8');
    const header = Yaml.dump({
      title: item.title,
      shortTitle: item.shortTitle,
      year: item.year,
      imageFilename: item.imageFilename,
    }, {
      forceQuotes: true,
    });
    fs.writeFileSync(`data/data/movies/${item.slug}.md`, `---\n${header}---\n\n${item.description}`);
  }
}

process.exit(0);
