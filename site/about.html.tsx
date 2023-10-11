import { Column } from './components/column/column';
import { TypicalPage } from './components/page';
import { Typography } from './components/typography';
import image from './img/page/home.jpg';

const sourceLink = "https://github.com/sdegutis/immaculatalibrary.com";

export default <>
  <TypicalPage image={image.path}>

    <Column spaced centered>
      <Typography>

        <h1>About Immaculata Library</h1>

        <p>The website Immaculata Library began as a quick place
          to store digital copies of invaluable and timeless
          Catholic books that have become copyright free,
          in order to easily share them with friends and family.</p>

        <p>Over time, it has grown to be a full online library,
          with links to free and paid Sacred music, links and
          reviews of Catholic movies, and links to other resources
          to help Catholics grow in devotion in this digital age.</p>

        <p>Only the most useful and approved of all Catholic books
          are selected for this website. This means, only books that
          have received official approbations from Bishops, <em>and</em> have
          helped to produce Saints, or are written by Saints, are offered.</p>

        <p>The <a href={sourceLink}>source code</a> for this site has also served
          as a perpetual pet project for me for the past few years, allowing me
          to keep my software development skills fresh and keep alive my passion
          for solving complex problems.</p>

      </Typography>
    </Column>

  </TypicalPage>
</>;
