import 'source-map-support/register';
import { RouteHandler, RouteInput, RouteOutput } from '../../src/http';
import { md } from './helpers';
import { allSnippets } from './snippet';

// console.log(allSnippets.length);

const routes = new Map<string, RouteHandler>();

for (const route of allSnippets) {
  route.addRoutes(routes);
}

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
  '$id': '6de8cf1e-a786-4b4d-bc24-5304c01cd8db',
  '$type': 'e805328c-26bc-4ee7-9a3e-a70e4ef8367e',
  path: '/500.html',
  title: 'Something went wrong',
  image: '/img/404-big.jpg',
  pageContent: {
    '$eval': '() => <p>Sorry, this page had an error. Try again later.</p>'
  }
};

const page404 = {
  '$id': 'c4e278c2-68d2-40dd-8a2a-0120df54c22a',
  '$type': 'e805328c-26bc-4ee7-9a3e-a70e4ef8367e',
  path: '/404.html',
  title: 'Page not found',
  image: '/img/404-big.jpg',
  pageContent: { '$eval': "() =>   <p>Sorry, couldn't find this page.</p>" }
};

export function routeHandler(input: RouteInput): RouteOutput {
  const key = `${input.method} ${input.url.pathname}`;
  const handler = routes.get(key);
  if (handler) {
    return handler(input);
  }
  return {
    body: 'not found'
  };
};

function wrapAuth(handler: (input: RouteInput & { isAdmin: boolean }) => RouteOutput): RouteHandler {
  return input => {
    return handler({ ...input, isAdmin: false });
  };
}
