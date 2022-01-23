import mime from 'mime';
import 'source-map-support/register';
import { RouteHandler, RouteInput, RouteOutput } from '../../src/http';
import { loadRoutes } from './core/router';
import { allBooks } from './model/book';
import { allCategories } from './model/category';
import { publishedSnippets } from './model/snippet';
import { notFoundPage } from './pages/404';
import { errorPage } from './pages/500';

for (const book of allBooks) {
  book.category = allCategories.find(cat => cat.bookSlugs.includes(book.slug))!;
  book.category.books.push(book);
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
    output = handler ? handler(input) : notFoundPage(input);
  }
  catch (e) {
    console.error(e);
    output = errorPage(input);
  }

  output.headers ??= {};
  output.headers['Strict-Transport-Security'] = 'max-age=15552000; includeSubDomains';
  output.headers['Content-Type'] ??= mime.getType(input.url.pathname) ?? undefined;

  return output;
};

function wrapAuth(handler: (input: RouteInput & { isAdmin: boolean }) => RouteOutput): RouteHandler {
  return input => {
    return handler({ ...input, isAdmin: false });
  };
}
