import { allBooks, allBooksPage } from "../model/book";
import { allCategories } from "../model/category";
import { allMovies, allMoviesPage } from "../model/movie";
import { allPages } from "../model/page";
import { allPosts, allPostsPage } from "../model/post";
import { allSnippets, allSnippetsPage, bookSnippetSearch } from "../model/snippet";
import { adminPages, EnrichedInput } from "../pages/admin";
import { homePage } from "../pages/home";
import { randomBookPage } from "../pages/random-book";
import { bookSnippetRandom, randomSnippetPage } from "../pages/random-snippet";
import { makeSitemap } from "../pages/sitemap";
import { staticFiles } from "./static";
import { RouteOutput } from "/../src/http";

type AuthedRouteHandler = (input: EnrichedInput) => RouteOutput;

export interface Routeable {
  route: string;
  get: AuthedRouteHandler;
  post?: AuthedRouteHandler;
  lastModifiedDate?: Date;
}

const routes = new Map<string, AuthedRouteHandler>();

const forSitemap: Routeable[] = [];

function addRouteable(routeable: Routeable) {
  if (!routeable.route.startsWith('/admin')) {
    forSitemap.push(routeable);
  }
  addRoute(`GET ${routeable.route}`, (input) => routeable.get!(input));

  if (routeable.post) {
    addRoute(`POST ${routeable.route}`, (input) => routeable.post!(input));
  }
}

function addRoute(route: string, handler: AuthedRouteHandler) {
  if (routes.has(route)) {
    throw new Error(`Duplicate route: ${route}`);
  }

  routes.set(route, handler);
}

export function loadRoutes() {
  addRouteable(allMoviesPage);
  addRouteable(allPostsPage);
  addRouteable(allBooksPage);
  addRouteable(allSnippetsPage);
  addRouteable(bookSnippetRandom);
  addRouteable(randomBookPage);
  addRouteable(randomSnippetPage);
  addRouteable(bookSnippetSearch);
  addRouteable(homePage);

  adminPages.forEach(addRouteable);
  allSnippets.forEach(addRouteable);
  staticFiles.forEach(addRouteable);
  allCategories.forEach(addRouteable);
  allBooks.forEach(addRouteable);
  allMovies.forEach(addRouteable);
  allPages.forEach(addRouteable);
  allPosts.forEach(addRouteable);

  routes.set('GET /index.html', input => ({
    status: 302,
    headers: { 'Location': '/' },
  }));

  addRouteable(makeSitemap(forSitemap));

  return routes;
}
