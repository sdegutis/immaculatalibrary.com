import { Spaced, SplitColumn } from "./components/column.js";
import { TypicalPage } from "./components/page.js";

export default <>
  <TypicalPage title="Fathers of the Church" image='/img/page/articles.jpg' page="Fathers">

    <Spaced>
      <SplitColumn>

        <div>

          <h3>The Fathers Gospel Commentary</h3>
          <p>
            The <a href='/books/catena-aurea.html'>Catena Aurea</a> contains
            commentary on every verse in the Gospels by the Fathers of the Church.
          </p>

          <h3>Notable Works by Church Fathers</h3>
          <ul>
            <li><a href='/books/catena-aurea.html'>Catena Aurea</a>, Gospel Commentary by the Fathers</li>
            <li><a href='/books/morals-on-the-book-of-job.html'>Morals on the Book of Job</a>, by St. Gregory the Great</li>
            <li><a href='/books/confessions.html'>Confessions</a>, by St. Augustine</li>
            <li><a href='/books/augustine-on-the-psalms.html'>Exposition on the Psalms</a>, by St. Augustine</li>
            <li><a href='/books/venerable-bedes-ecclesiastical-history-of-england.html'>Ecclesiastical History of England</a>, by St. Bede</li>
          </ul>

          <h3>Why not use CatenaBible.com?</h3>
          <p>
            They're missing a huge number of quotes from the Church Fathers
            on the gospels, which are found in the Catena Aurea. It's also
            run by some Orthodoxes, who may be biased toward Greek fathers.
          </p>

          <h3>Why not use New Advent?</h3>
          <p>
            The edition of the Church Fathers they digitized was translated
            by anti-Catholics. This site uses the previous English translation
            of the Church Fathers that was deemed "too Catholic" for them.
          </p>

        </div>

        <div>

          <h3>Digital Search</h3>
          <p>(Coming soon.)</p>

        </div>

      </SplitColumn>
    </Spaced>

  </TypicalPage>
</>;
