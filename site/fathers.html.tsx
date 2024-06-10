import { Spaced, SplitColumn } from "./components/column.js";
import { TypicalPage } from "./components/page.js";

export default <>
  <TypicalPage title="Fathers of the Church" image='/img/page/articles.jpg' page="Fathers">

    <Spaced>
      <SplitColumn>

        <div>

          <h3>Catena Aurea</h3>
          <p>
            The <a href='/books/catena-aurea.html'>Catena Aurea</a> contains
            commentary on every verse in the Gospels by the Fathers of the Church.
          </p>

          <h3>Why not use Catena Bible?</h3>
          <p>
            The website CatenaBible.com is missing a huge number of quotes
            from the Church Fathers on the gospels, which are found in the
            Catena Aurea on this site. It's also updated by some Orthodoxes,
            and may possibly be omitting some quotes out of a bias.
          </p>
          <p>
            It's probably still fine to use the Catena Bible, just as long as
            the quotes are verified, and it's not used as an exhaustive source.
          </p>

          <h3>Why not use New Advent?</h3>
          <p>
            The project of translating the Fathers of the Church into English
            was started by Dr. Edward B. Pusey and other Anglican scholars
            in the 1800s, who were of the high-church party that wanted to
            rediscover the Church of England's historical roots, and recover
            the lost treasures of tradition and doctrine that were lost
            when King Henry VIII had separated from Rome so violently.
          </p>
          <p>
            Many such high-church Anglicans soon converted to Catholicism,
            and so the project had lost vital members. A few years later,
            several low-church Anglicans decided that this first translation
            was "too Catholic" and began a project to retranslate the Fathers
            according to their more Protestant principles. This new translation
            was published in two volumes as the Ante-Nicene Fathers, and the
            Nicene and Post-Nicene Fathers.
          </p>
          <p>
            New Advent used the Ante-Nicene Fathers, and Nicene and Post-Nicene
            Fathers as the basis for their digital edition. Immaculata Library
            uses the original Fathers translation by the high-church Anglicans,
            which was heavily edited by St. John Henry Newman shortly before
            his conversion. In the future, when the new translation of the 1940s
            and 1950s becomes public domain, ideally that will be used.
          </p>

        </div>

        <div>

          <h3>Digital Search</h3>
          <p>(Coming soon.)</p>

          <h3>Notable Works by Church Fathers</h3>
          <ul>
            <li><a href='/books/catena-aurea.html'>Catena Aurea</a>, Gospel Commentary by the Fathers</li>
            <li><a href='/books/morals-on-the-book-of-job.html'>Morals on the Book of Job</a>, by St. Gregory the Great</li>
            <li><a href='/books/confessions.html'>Confessions</a>, by St. Augustine</li>
            <li><a href='/books/augustine-on-the-psalms.html'>Exposition on the Psalms</a>, by St. Augustine</li>
            <li><a href='/books/venerable-bedes-ecclesiastical-history-of-england.html'>Ecclesiastical History of England</a>, by St. Bede</li>
          </ul>

        </div>

      </SplitColumn>
    </Spaced>

  </TypicalPage>
</>;
