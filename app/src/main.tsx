import mime from 'mime';
import 'source-map-support/register';
import { RouteInput, RouteOutput } from '../../src/http';
import { loadRoutes } from './core/router';
import { allBooks } from './model/book';
import { allCategories } from './model/category';
import { notFoundPage } from './pages/404';
import { errorPage } from './pages/500';
import { enrichAuth } from './pages/admin';
import { publishedSnippets } from './snippets';

for (const book of allBooks) {
  for (const cat of allCategories) {
    if (cat.bookSlugs.has(book.slug)) {
      book.category = cat;
      cat.books.push(book);
    }
  }
}

for (const snippet of publishedSnippets) {
  snippet.book = allBooks.find(book => book.slug.includes(snippet.bookSlug))!;
  snippet.book.snippets.push(snippet);
}

const routes = loadRoutes();

export function routeHandler(input: RouteInput): RouteOutput {
  const key = `${input.method} ${input.url.pathname}`;
  const handler = routes.get(key);
  let output: RouteOutput;

  try {
    if (handler) {
      output = enrichAuth(handler)(input);
    }
    else {
      output = enrichAuth(notFoundPage)(input);
    }
  }
  catch (e) {
    console.error(e);
    output = enrichAuth(errorPage)(input);
  }

  output.headers ??= {};
  output.headers['Strict-Transport-Security'] = 'max-age=15552000; includeSubDomains';
  output.headers['Content-Type'] ??= mime.getType(input.url.pathname) ?? undefined;

  return output;
};
