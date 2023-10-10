import { Music, allMusics } from '../model/musics';

export const MusicSidebar: JSX.Component = (attrs, children) => <>
  <div>

    <h4>Christmas Music</h4>
    <ul>
      {allMusics.filter(s => s.data.category === 'Christmas').map(song => <>
        <li>
          <a href={`/music/${song.slug}.html`}>{song.data.title}</a>
        </li>
      </>)}
    </ul>

  </div>
</>;

export const SongLink: JSX.Component<{ song: Music }> = ({ song }, children) => <>
  <a>{song.data.title}</a>
</>;
