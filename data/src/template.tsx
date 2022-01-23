
const categoryOrder = [
  'classics',
  'devotion',
  'instruction',
  'reference',
  'saints',
  'mary',
  'joseph',
  'apologetics',
  'blessed-sacrament',
  'sacred-heart',
  'holy-spirit',
  'lourdes',
  'st-francis-de-sales',
  'st-alphonsus-de-liguori',
  'st-catherine-of-siena',
  'st-teresa-of-avila',
  'st-john-of-the-cross',
  'st-john-henry-newman',
  'st-thomas-more',
  'st-thomas-aquinas',
  'st-louis-de-montfort',
  'jesuits',
  'fr-lasance'
];

const movieOrder = [
  'passion-of-the-christ',
  'a-man-for-all-seasons',
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
  'saint-john-baptist-de-la-salle'
];


export const SiteTemplate = ({ isAdmin, title, image, description, head, content, pageContent, pageSidebar }) => {

  const { reading_mins, format_date, excerpt } = $site.named('helpers');

  return <>
    {'<!DOCTYPE html>'}
    <html lang="en">

      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>{title && `${title} - `}Immaculata Library</title>
        <meta property="og:title" content={'Immaculata Library' + (title ? `: ${title}` : '')} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content={`http://immaculatalibrary.com${image}`} />
        <meta name="description" content={description ?? "Free Digital Catholic Books"} />

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

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QNRF1FKVD7"></script>
        <script>
          {`window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', 'G-QNRF1FKVD7');`}
        </script>

        {head}

      </head>

      <body>
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

        <main>

          {content ? content() : <>

            <section id="page-hero" style={`background-image: url(${image});`}></section>

            <div class="container">
              <section class="spaced-main-content split-page">

                <div class="content">
                  <h1>{title}</h1>
                  {pageContent()}
                </div>

                {pageSidebar?.()}

              </section>
            </div>

          </>}

          <div id="recents">
            <div class="container">

              {/* <h2>Blog Posts</h2>
              <p><a href="/posts.html">See all</a></p>

              <ul id="posts">

                {recentPosts.map(post => <>
                  <li class="post-box">
                    <a href={post.$route()}>
                      <img class="image" src={post.imageFilename} />
                    </a>
                    <a class="title" href={post.$route()}>
                      {post.title}
                    </a>
                    <span class="date">
                      {format_date(post.date)} &bull;  {reading_mins(post.content)} min
                    </span>
                    <div class="excerpt">
                      {markdown.render(excerpt(post.content))}
                    </div>
                  </li>

                </>)}
              </ul> */}

              <h2>Books</h2>
              <ul class="quicklinks">

                {$site.named('categories').$items.map(cat =>
                  <li>
                    <a class="link" href={cat.$route()} style={`background-image: url(/img/${cat.slug}.jpg);`}>
                      <span>{cat.shortTitle}</span>
                    </a>
                  </li>
                )}

              </ul>

              <h2>Movies</h2>
              <ul class="quicklinks">

                {$site.named('movies').$items.map(movie =>
                  <li>
                    <a class="link" href={movie.$route()} style={`background-image: url(/img/movies/${movie.slug}-small.jpg);`}>
                      <span>{movie.shortTitle}</span>
                    </a>
                  </li>
                )}

                <li>
                  <a class="link" href="/audio-bible.html" style="background-image: url(/img/audiobible.png);">
                    <span>Audio Bible</span>
                  </a>
                </li>

              </ul>

            </div>
          </div>

        </main>

        <footer id="site-footer">
          <p>
            {new Date().getFullYear()} ImmaculataLibrary.com &copy; All Rights Reserved
            {' | '}
            <a href="mailto:immaculatalibrary@gmail.com">Contact</a>
            {' | '}
            <a href="#" id="dark-mode-toggle" data-lightmode="Light mode" data-darkmode="Dark mode"></a>
            {isAdmin && <> | <a href="/admin3">Admin</a></>}
          </p>
        </footer>
        <script>
          {`for (const link of document.querySelectorAll('a[href^="https://archive.org/details/"]')) {
        link.target = '_blank';
      }`}
        </script>
      </body>

    </html>
  </>
};
