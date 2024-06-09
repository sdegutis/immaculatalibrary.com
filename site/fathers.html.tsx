import { Spaced, SplitColumn } from "./components/column.js";
import { TypicalPage } from "./components/page.js";

export default <>
  <TypicalPage title="Fathers of the Church" image='/img/page/articles.jpg'>

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
          <p>
            Coming soon.
          </p>
        </div>

      </SplitColumn>
    </Spaced>

  </TypicalPage>
</>;
