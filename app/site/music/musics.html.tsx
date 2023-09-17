import * as Common from "../../components/common";
import { MusicSidebar } from "../../components/music-sidebar";
import { markdown } from "../../core/helpers";
import { allMusics } from "../../model/models";

export default allMusics.map(song => {
  const embedUrl = song.youtube.replace('watch?v=', 'embed/').replace(/&t=(\d+)s/, '?start=$1');
  return [`${song.slug}.html`, <>
    <link rel="stylesheet" href='/css/view-song.css' />

    <Common.Page>

      <Common.SiteHeader image='/img/page/music.jpg' />
      <Common.Navlinks />

      <main>

        <Common.Column spaced split>

          <Common.Typography>
            <h1>{song.title}</h1>
            <div class="embed-container">
              <iframe allowfullscreen="allowfullscreen" frameborder="0" src={embedUrl}></iframe>
            </div>
            {markdown.render(song.content)}
          </Common.Typography>

          <MusicSidebar />

        </Common.Column>

      </main>

      <Common.QuickLinks />
      <Common.SiteFooter />

    </Common.Page>
  </>];
});
