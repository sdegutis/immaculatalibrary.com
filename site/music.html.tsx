import { Column, Spaced } from "./components/column.jsx";
import { MusicSidebar } from "./components/music-sidebar.js";
import { TypicalPage } from "./components/page.js";
import { Typography } from "./components/typography.js";

const playlist = 'https://open.spotify.com/playlist/2VpGGkgru7iXryNu1PMid0?si=ab81cea245694a6e';

export default <>
  <TypicalPage title="Music" image='/img/page/music.jpg'>

    <Spaced>
      <Column split>

        <Typography>
          <h2>Sacred Music</h2>
          <p>
            Reading holy books can help us grow in devotion to God, and movies can
            help us visualize these sacred mysteries. But countless angels are
            singing the Lord's praises <em>right now</em> in Heaven. Listening to Sacred Music
            (and singing or playing it!) is a powerful way to join these angels in
            praising our Lord and Redeemer, in a way that deeply touches the Father's heart.
          </p>
          <p>
            The works on ImmaculataLibrary.com seem to pair very well with the music
            in <a href={playlist}>this Spotify playlist</a>. Although it contains secular
            instrumental music, the style and tone of each piece has been selected for
            having a quality and feeling that is very otherworldy, pensive, and uplifting.
          </p>
        </Typography>

        <MusicSidebar />

      </Column>
    </Spaced>

  </TypicalPage>
</>;
