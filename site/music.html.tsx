import { Column, Spaced } from "./components/column/column";
import { MusicSidebar } from "./components/music-sidebar";
import { TypicalPage } from "./components/page";
import { Typography } from "./components/typography";

export default <>
  <TypicalPage image='/img/page/music.jpg'>

    <Spaced>
      <Column split>

        <Typography>
          <h1>Sacred Music</h1>
          <p>
            Reading holy books can help us grow in devotion to God, and movies can
            help us visualize these sacred mysteries. But countless angels are
            singing the Lord's praises <em>right now</em> in Heaven. Listening to Sacred Music
            (and singing or playing it!) is a powerful way to join these angels in
            praising our Lord and Redeemer, in a way that deeply touches the Father's heart.
          </p>
        </Typography>

        <MusicSidebar />

      </Column>
    </Spaced>

  </TypicalPage>
</>;
