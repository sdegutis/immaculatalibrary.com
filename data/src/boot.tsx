import mime from 'mime';
import 'source-map-support/register';
import { RouteHandler, RouteInput, RouteOutput } from '../../src/http';
import { allBooks } from './model/book';
import { allCategories } from './model/category';
import { allMovies } from './model/movie';
import { allSnippets } from './model/snippet';
import { addRouteable, routes } from './router';
import { staticFiles } from './static';

for (const book of allBooks) {
  book.category = allCategories.find(c => c.bookSlugs.includes(book.slug))!;
  book.category.books.push(book);
}

allSnippets.forEach(addRouteable);
staticFiles.forEach(addRouteable);
allCategories.forEach(addRouteable);
allBooks.forEach(addRouteable);
allMovies.forEach(addRouteable);

routes.set('GET /index.html', input => ({
  status: 302,
  headers: { 'Location': '/' },
}));

routes.set('GET /', wrapAuth(input => {
  return {
    headers: {
      'Content-Type': 'text/html'
    },
    body: <ul>
      {[...routes.entries()]
        .filter(([path, handler]) => path.startsWith('GET '))
        .map(([path, handler]) => {
          path = path.replace(/^GET /, '');
          return <li>
            <a href={path}>{path}</a>
          </li>;
        })}
    </ul>
  };
}));

const page500 = {
  path: '/500.html',
  title: 'Something went wrong',
  image: '/img/404-big.jpg',
  pageContent: () => <p>Sorry, this page had an error. Try again later.</p>
};

const page404 = {
  path: '/404.html',
  title: 'Page not found',
  image: '/img/404-big.jpg',
  pageContent: () => <p>Sorry, couldn't find this page.</p>
};

export function routeHandler(input: RouteInput): RouteOutput {
  const key = `${input.method} ${input.url.pathname}`;
  const handler = routes.get(key);
  let output: RouteOutput;

  output = handler ? handler(input) : notFoundPage(input);

  output.headers ??= {};
  output.headers['Strict-Transport-Security'] = 'max-age=15552000; includeSubDomains';
  output.headers['Content-Type'] ??= mime.getType(input.url.pathname) ?? undefined;

  return output;
};

function notFoundPage(input: RouteInput): RouteOutput {
  return { body: 'Not found' };
}

function wrapAuth(handler: (input: RouteInput & { isAdmin: boolean }) => RouteOutput): RouteHandler {
  return input => {
    return handler({ ...input, isAdmin: false });
  };
}
