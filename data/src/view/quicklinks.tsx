import { Component } from "./types";

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

export const QuickLinks: Component = (attrs, children) => <>

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

</>;
