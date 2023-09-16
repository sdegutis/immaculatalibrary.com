import { allSongs } from "../../model/models";
import { Song } from "../../model/song";

export const MusicSidebar: JSX.Component<{}> = (attrs, children) => <>
  <div>

    <h4>Christmas Music</h4>
    <ul>
      {allSongs.filter(s => s.category === 'Christmas').map(song => <>
        <li>
          <a href={song.view.route}>{song.title}</a>
        </li>
      </>)}
    </ul>

  </div>
</>;

export const SongLink: JSX.Component<{ song: Song }> = ({ song }, children) => <>
  <a>{song.title}</a>
</>;
