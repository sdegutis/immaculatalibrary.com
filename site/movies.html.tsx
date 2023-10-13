import { Column, Spaced } from "./components/column/column";
import { MoviesSidebar } from "./components/movies-sidebar";
import { TypicalPage } from "./components/page";
import { Typography } from "./components/typography";

export default <>
  <TypicalPage image='/img/movies/passion-of-the-christ-big.jpg'>

    <Spaced>
      <Column split>

        <Typography>
          <h1>Holy Movies</h1>
          <p>
            Books are not the only way to experience the
            lives of the saints! Movies can be a great way
            to increase our devotion and love for God through
            his Saints. This page contains a roughly priotized
            list of recommended and reviewed Catholic movies.
          </p>
        </Typography>

        <MoviesSidebar />

      </Column>
    </Spaced>

  </TypicalPage>
</>;
