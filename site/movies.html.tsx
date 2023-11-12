import { Spaced, SplitColumn } from "./components/column.js";
import { MoviesList, VideosList } from "./components/movies-sidebar.js";
import { TypicalPage } from "./components/page.js";
import { Typography } from "./components/typography.js";

export default <>
  <TypicalPage title="Movies" image='/img/movies/passion-of-the-christ-big.jpg'>

    <Spaced>
      <SplitColumn>

        <Typography>
          <h2>Holy Movies</h2>
          <p>
            Books are not the only way to experience the
            lives of the saints! Movies can be a great way
            to increase our devotion and love for God through
            his Saints. This page contains a roughly priotized
            list of recommended and reviewed Catholic movies.
          </p>
        </Typography>

        <div>
          <MoviesList />
          <VideosList />
        </div>

      </SplitColumn>
    </Spaced>

  </TypicalPage>
</>;
