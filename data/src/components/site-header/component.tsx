import header2 from '/data/';
import header from '/src/components/site-header/header.css';

console.log(header);
console.log(header2);

export default () => <>
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
