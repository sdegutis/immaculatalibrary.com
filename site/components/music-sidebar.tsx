import { allMusics } from '../model/musics.js';

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

    <h4>Purgatory Music</h4>
    <ul>
      {allMusics.filter(s => s.data.category === 'Purgatory').map(song => <>
        <li>
          <a href={`/music/${song.slug}.html`}>{song.data.title}</a>
        </li>
      </>)}
    </ul>

    <h4>Accidentally Christian Music</h4>
    <ul>
      {allMusics.filter(s => s.data.category === 'Accidentally Christian').map(song => <>
        <li>
          <a href={`/music/${song.slug}.html`}>{song.data.title}</a>
        </li>
      </>)}
    </ul>

  </div>
</>;
