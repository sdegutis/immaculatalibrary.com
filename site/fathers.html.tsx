import { Spaced, SplitColumn } from "./components/column.js";
import { TypicalPage } from "./components/page.js";

export default <>
  <TypicalPage title="Fathers of the Church" image='/img/page/articles.jpg' page="Fathers">

    <Spaced>
      <SplitColumn>

        <div>
          <p>
            <a href='/books/catena-aurea.html'>The Catena Aurea</a> contains commentary on the Gospels
            by the Fathers of the Church. This page lets you search through the digitized pages.
          </p>
          <p>(Catena Bible is missing quite a few quotes, plus that site is made by some orthodoxes.)</p>
        </div>

        <div>
          <p>Coming soon.</p>
          <p>For now, some books of the Fathers:</p>
          <ul>
            <a href='/books/morals-on-the-book-of-job.html'>Morals on the Book of Job, by St. Gregory the Great</a>
            <a href='/books/confessions.html'>Confessions, by St. Augustine</a>
            <a href='/books/augustine-on-the-psalms.html'>Exposition on the Psalms, by St. Augustine</a>
          </ul>
        </div>

      </SplitColumn>
    </Spaced>

  </TypicalPage>
</>;
