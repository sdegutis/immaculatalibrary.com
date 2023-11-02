import { Column, Spaced } from "../components/column.js";
import { MoviesList, VideosList } from "../components/movies-sidebar.js";
import { TypicalPage } from "../components/page.js";
import { Typography } from "../components/typography.js";
import { markdown } from "../core/helpers.js";
import { allVideos } from "../model/videos.js";

export default allVideos.map(video => {
  return [`${video.slug}.html`, <>
    <TypicalPage title="Fulton Sheen Videos" image={`/img/categories/blessed-sacrament-big.jpg`}>

      <Spaced>
        <Column split>

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

        </Column>
      </Spaced>

    </TypicalPage>
  </>];
});
