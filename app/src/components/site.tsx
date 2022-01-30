import { EnrichedInput, loginRoute, logoutRoute } from "../auth/login";
import { DarkModeButton, darkModeScript } from "./dark-mode/button";
import { fontsCssRoute } from "/src/font/fonts";

export const Html: Component<{}> = (attrs, children) => <>
  {'<!DOCTYPE html>'}
  <html lang="en">
    {children}
  </html>
</>

export const Head: Component<{ imagePath?: string, title?: string, description?: string }> = (attrs, children) => <>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>{attrs.title && `${attrs.title} - `}Immaculata Library</title>
    <meta property="og:title" content={'Immaculata Library' + (attrs.title ? `: ${attrs.title}` : '')} />
    <meta property="og:locale" content="en_US" />
    <meta property="og:image" content={`https://www.immaculatalibrary.com${attrs.imagePath ?? mainSiteHeaderImagePath}`} />
    <meta name="description" content={attrs.description ?? "Free Digital Catholic Books"} />

    <script src={darkModeScript}></script>
    <link rel="stylesheet" href="/css/base/base.css" />
    <link rel="stylesheet" href="/css/base/header.css" />
    <link rel="stylesheet" href="/css/base/footer.css" />
    <link rel="stylesheet" href={fontsCssRoute} />
    <link rel="stylesheet" href="/css/base/page-hero.css" />
    <link rel="stylesheet" href="/css/base/layout.css" />
    <link rel="stylesheet" href="/css/base/typography.css" />

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />

    {children}
  </head>
</>;

export const SiteHeader: Component<{}> = (attrs, children) => <>
  <header id="site-header">
    <nav class="container">
      <a href="/">Immaculata Library</a>
      <ul>
        <li>
          <ul>
            <li><a href="/about.html">About</a></li>
            <li><a href="/books.html">Books</a></li>
            <li><a href="/movies.html">Movies</a></li>
          </ul>
        </li>
        <li>
          <ul>
            <li><a href="/music.html">Music</a></li>
            <li><a href="/audio-bible.html">Audio Bible</a></li>
            <li><a href="/devotions.html">Devotions</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</>;

export const SiteFooter: Component<{ input: EnrichedInput }> = (attrs, children) => <>
  <footer id="site-footer">
    <p>
      {new Date().getFullYear()} ImmaculataLibrary.com &copy; All Rights Reserved
      {' | '}
      <a href="mailto:immaculatalibrary@gmail.com">Contact</a>
      {' | '}
      <DarkModeButton />
      {' | '}
      {attrs.input.session?.isAdmin ? <>
        <a href={logoutRoute.route}>Logout</a>
      </> : <>
        <a href={loginRoute.route}>Login</a>
      </>}
    </p>
  </footer>
  <script>
    {`for (const link of document.querySelectorAll('a[href^="https://archive.org/details/"]')) {
        link.target = '_blank';
      }`}
  </script>
</>;
