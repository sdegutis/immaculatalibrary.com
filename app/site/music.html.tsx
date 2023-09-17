import * as Common from "../components/common";
import { MusicSidebar } from "../components/music-sidebar";

export default <>
  <Common.TypicalPage image='/img/page/music.jpg'>

    <Common.Column spaced split>

      <Common.Typography>
        <h1>Sacred Music</h1>
        <p>
          Reading holy books can help us grow in devotion to God, and movies can
          help us visualize these sacred mysteries. But countless angels are
          singing the Lord's praises *right now* in Heaven. Listening to Sacred Music
          (and singing or playing it!) is a powerful way to join these angels in
          praising our Lord and Redeemer, in a way that deeply touches the Father's heart.
        </p>
      </Common.Typography>

      <MusicSidebar />

    </Common.Column>

  </Common.TypicalPage>
</>;
