import * as fs from "fs";
import Yaml from 'js-yaml';

const rawItems = require('../../../../../Downloads/imlib-backup-2022-01-18T13_31_41.688Z.json');
const items: any[] = Object.entries<any>(rawItems).map(([$id, data]) => ({ $id, ...data }));

const staticItems = items.filter(it => it.$type === '73c941de-a7e9-4bce-98b1-9bb59ef57b65');
const movieItems = items.filter(it => it.$type === '10a9ab1a-0665-4905-8c5c-2410739a7ad8');
const categoryItems = items.filter(it => it.$type === '51b0efc7-ed85-4e3c-b747-ae8c90c74038');

const snippetItems = items.filter(it => it.$type === '7493c4fd-eb27-4acb-9ce3-569624a82195');
const bookItems = items.filter(it => it.$type === '13d55978-5a2d-4144-a32c-ba0ef7ad8020');
const postItems = items.filter(it => it.$type === 'aca5fd0a-04a1-43e7-a625-b16c99cc41c9');
const pageItems = items.filter(it => it.$type === 'e805328c-26bc-4ee7-9a3e-a70e4ef8367e');

console.log(snippetItems.length);
console.log(bookItems.length);
console.log(postItems.length);
console.log(categoryItems.length);
console.log(pageItems.length);

// const remainder = items.filter(it =>
//   !staticItems.includes(it) &&
//   !movieItems.includes(it) &&
//   !snippetItems.includes(it) &&
//   !bookItems.includes(it) &&
//   !categoryItems.includes(it) &&
//   !pageItems.includes(it) &&
//   !postItems.includes(it)
// );

// console.log(remainder[3])
// console.log(remainder.map(it => it.$name))

console.log(keysIn(bookItems));
console.log(bookItems.length)

function keysIn(items: any[]) {
  const map = new Map<string, number>();
  for (const it of items) {
    for (const key of Object.keys(it)) {
      map.set(key, (map.get(key) ?? 0) + 1);
    }
  }
  return map;
}

// importPublic();
// importMovies();
// importCategories();
// importSnippets();
// importBooks();

function importBooks() {
  for (const item of bookItems) {
    const header = Yaml.dump({
      title: item.title,
      subtitle: item.subtitle,
      dateAdded: item.dateAdded.split('T')[0],
      author: item.author,
      translator: item.translator,
      score: item.score,
      rating: item.rating,
      files: item.files,
      storeLinks: item.storeLinks,
    }, {
      forceQuotes: true,
    });
    fs.writeFileSync(`data/data/books/${item.slug}.md`, `---\n${header}---\n\n${item.description}`);
  }
}


function importSnippets() {
  for (const item of snippetItems) {
    const yyyymmdd = item.date.split('T')[0];
    const header = Yaml.dump({
      published: item.published,
      date: yyyymmdd,
      title: item.title,
      slug: item.slug,
      archiveLink: item.archiveLink,
      bookSlug: item.bookSlug,
    }, {
      forceQuotes: true,
    });
    fs.writeFileSync(`data/data/snippets/${item.$id}.md`, `---\n${header}---\n\n${item.content}`);
  }
}

function importCategories() {
  for (const item of categoryItems) {
    const header = Yaml.dump({
      title: item.title,
      shortTitle: item.shortTitle,
      imageFilename: item.imageFilename,
      books: item.books,
    }, {
      forceQuotes: true,
    });
    fs.writeFileSync(`data/data/categories/${item.slug}.md`, `---\n${header}---\n\n${item.description}`);
  }
}

function importPublic() {
  for (const item of staticItems) {
    if (item.$id === 'acf40391-f6ea-4002-ae07-7a9f947d24e2') {
      item.content = item.script;
    }
    if (item.$id === '078ff266-1604-4e87-8512-eb85a942b8f4') {
      item.content = item.style;
    }
    const buffer = Buffer.from(item.content, item.base64 ? 'base64' : 'utf8');
    fs.writeFileSync('data/public/' + item.path, buffer);
  }
}

function importMovies() {
  for (const item of movieItems) {
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

// console.log(categoryItems.sort((a, b) =>
//   a.sortOrder < b.sortOrder ? -1 :
//     a.sortOrder > b.sortOrder ? 1 :
//       0).map(it => it.slug));

// console.log(movieItems.sort((a, b) =>
//   a.sortOrder < b.sortOrder ? -1 :
//     a.sortOrder > b.sortOrder ? 1 :
//       0).map(it => it.slug));

process.exit(0);
