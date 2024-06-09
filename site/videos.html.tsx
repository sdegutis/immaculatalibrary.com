import { Spaced, SplitColumn } from "./components/column.js";
import { MoviesList, VideosList } from "./components/movies-sidebar.js";
import { TypicalPage } from "./components/page.js";
import { Typography } from "./components/typography.js";

export default <>
  <TypicalPage page="Movies" title="Movies" image='/img/movies/passion-of-the-christ-big.jpg'>

    <Spaced>
      <SplitColumn>

        <Typography>
          <h2>Fulton Sheen Videos</h2>
          <p>
            Venerable Fulton Sheen was a passionate and powerful
            speaker who explained the Catholic faith in terms
            that made complicated topics easy to understand
            and often ignited the faithful with a passion for God.
          </p>
        </Typography>

        <div>
          <VideosList />
          <MoviesList />
        </div>

      </SplitColumn>
    </Spaced>

  </TypicalPage>
</>;
