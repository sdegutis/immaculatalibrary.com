import * as Common from "../../components/common";
import { MusicSidebar } from "../../components/music-sidebar";
import { markdown } from "../../core/helpers";
import { allMusics } from "../../model/models";

export default allMusics.map(song => {
  const embedUrl = song.data.youtube.replace('watch?v=', 'embed/').replace(/&t=(\d+)s/, '?start=$1');
  return [`${song.data.slug}.html`, <>
    <Common.TypicalPage image='/img/page/music.jpg'>

      <link rel="stylesheet" href='/css/view-song.css' />

      <Common.Column spaced split>

        <Common.Typography>
          <h1>{song.data.title}</h1>
          <div class="embed-container">
            <iframe allowfullscreen="allowfullscreen" frameborder="0" src={embedUrl}></iframe>
          </div>
          {markdown.render(song.data.content)}
        </Common.Typography>

        <MusicSidebar />

      </Common.Column>

    </Common.TypicalPage >
  </>];
});
