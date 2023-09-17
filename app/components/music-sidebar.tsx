import { allMusics } from "../model/models";
import { Music } from "../model/musics";

export const MusicSidebar: JSX.Component<{}> = (attrs, children) => <>
  <div>

    <h4>Christmas Music</h4>
    <ul>
      {allMusics.filter(s => s.category === 'Christmas').map(song => <>
        <li>
          <a href={`/music/${song.slug}.html`}>{song.title}</a>
        </li>
      </>)}
    </ul>

  </div>
</>;

export const SongLink: JSX.Component<{ song: Music }> = ({ song }, children) => <>
  <a>{song.title}</a>
</>;
