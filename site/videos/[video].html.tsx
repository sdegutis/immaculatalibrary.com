import { Typography } from "../components/$typography.js";
import { Spaced, SplitColumn } from "../components/column.js";
import { MoviesList, VideosList } from "../components/movies-sidebar.js";
import { TypicalPage } from "../components/page.js";
import { allVideos } from "../model/videos.js";
import { markdown } from "../util/helpers.js";

export default allVideos.map(video => {
  return [video.slug, <>
    <TypicalPage page="Movies" title="Fulton Sheen Videos" image={`/img/categories/blessed-sacrament-big.jpg`}>

      <Spaced>
        <SplitColumn>

          <Typography>
            <h2>{video.data.title}</h2>

            <link rel='stylesheet' href='/css/page/video.css' />

            <div class="embed-container">
              <iframe allowfullscreen="allowfullscreen" frameborder="0" src={video.data.youtube} data-ruffle-polyfilled="" />
            </div>

            <p>By {video.data.author}</p>

            {video.data.desc &&
              <p>{video.data.desc}</p>
            }

            <hr />

            {video.content
              ? markdown.render(video.content)
              : <p><em>No transcript available yet.</em></p>}

          </Typography>

          <div>
            <VideosList />
            <MoviesList />
          </div>

        </SplitColumn>
      </Spaced>

    </TypicalPage>
  </>];
});
