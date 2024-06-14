import { Spaced, SplitColumn } from "../components/column.js";
import { MusicSidebar } from "../components/music-sidebar.js";
import { TypicalPage } from "../components/page.js";
import { Typography } from "../components/typography.js";
import { markdown } from "../core/helpers.js";
import { allMusics } from "../model/musics.js";

export default allMusics.map(song => {
  const embedUrl = song.data.youtube.replace('watch?v=', 'embed/').replace(/&t=(\d+)s/, '?start=$1');
  return [song.slug, <>
    <TypicalPage title="Music" image='/img/page/music.jpg' page="Music">

      <link rel="stylesheet" href='/css/page/song.css' />

      <Spaced>
        <SplitColumn>

          <Typography>
            <h2>{song.data.title}</h2>
            <div class="embed-container">
              <iframe allowfullscreen="allowfullscreen" frameborder="0" src={embedUrl}></iframe>
            </div>
            {markdown.render(song.content)}
          </Typography>

          <MusicSidebar />

        </SplitColumn>
      </Spaced>

    </TypicalPage >
  </>];
});
