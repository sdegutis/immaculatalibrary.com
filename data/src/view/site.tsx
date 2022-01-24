import { Component } from "./types";

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
    <meta property="og:image" content={`http://immaculatalibrary.com${attrs.imagePath}`} />
    <meta name="description" content={attrs.description ?? "Free Digital Catholic Books"} />

    <script src="/js/dark-mode.js"></script>
    <link rel="stylesheet" href="/css/base/base.css" />
    <link rel="stylesheet" href="/css/base/header.css" />
    <link rel="stylesheet" href="/css/base/footer.css" />
    <link rel="stylesheet" href="/css/base/fonts.css" />
    <link rel="stylesheet" href="/css/base/page-hero.css" />
    <link rel="stylesheet" href="/css/base/layout.css" />
    <link rel="stylesheet" href="/css/base/typography.css" />
    <link rel="stylesheet" href="/css/base/share.css" />

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />

    {/* <script>
      {`
        const cyrb53 = function(str, seed = 0) {
          let h1 = 0xdeadbeef ^ seed,
              h2 = 0x41c6ce57 ^ seed;
          for (let i = 0, ch; i < str.length; i++) {
              ch = str.charCodeAt(i);
              h1 = Math.imul(h1 ^ ch, 2654435761);
              h2 = Math.imul(h2 ^ ch, 1597334677);
          }
          h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
          h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
          return 4294967296 * (2097151 & h2) + (h1 >>> 0);
        };

        let clientIP = "{$_SERVER['REMOTE_ADDR']}";
        let validityInterval = Math.round (new Date() / 1000 / 3600 / 24 / 4);
        let clientIDSource = clientIP + ";" + window.location.host + ";" + navigator.userAgent + ";" + navigator.language + ";" + validityInterval;
        let clientIDHashed = cyrb53(clientIDSource).toString(16);

        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'G-QNRF1FKVD7', {
          'storage': 'none',
          'clientId': clientIDHashed
        });
        ga('set', 'anonymizeIp', true);
        ga('send', 'pageview');
      `}
    </script> */}

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

export const SiteFooter: Component<{}> = (attrs, children) => <>
  <footer id="site-footer">
    <p>
      {new Date().getFullYear()} ImmaculataLibrary.com &copy; All Rights Reserved
      {' | '}
      <a href="mailto:immaculatalibrary@gmail.com">Contact</a>
      {' | '}
      <a href="#" id="dark-mode-toggle" data-lightmode="Light mode" data-darkmode="Dark mode"></a>
    </p>
  </footer>
  <script>
    {`for (const link of document.querySelectorAll('a[href^="https://archive.org/details/"]')) {
        link.target = '_blank';
      }`}
  </script>
</>;
