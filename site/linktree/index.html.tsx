import { jsxToString } from "@imlib/core";
import { CenteredColumn, Spaced } from '../components/column.js';
import { EmptyPage } from '../components/page.js';

export default jsxToString(<>
  <EmptyPage>
    <Spaced>
      <CenteredColumn>
        <div>
          <link rel="stylesheet" href="./linktree.css" />
          <div id='linktree'>
            <span>Theology</span>
            <a target="_blank" href="https://thegospelbygenz.com">The Gospel by Gen Z</a>
            <a target="_blank" href="https://immaculatalibrary.com">Immaculata Library</a>
            <span>Social Media</span>
            <a target="_blank" href="https://www.tiktok.com/@gen.z.biblestories">TikTok</a>
            <a target="_blank">Discord: genzbiblestories</a>
            <a target="_blank" href="https://truthsocial.com/@genzbiblestories">Truth Social</a>
            <a target="_blank" href="https://x.com/gzbs_official">X</a>
            <span>Software (10% finished projects)</span>
            <a target="_blank" href="https://vanillajsx.com">vanillajsx.com</a>
            <a target="_blank" href="https://minigamemaker.com">Mini Game Maker</a>
            <a target="_blank" href="https://thesoftwarephilosopher.com">The Software Philosopher</a>
            <a target="_blank" href="https://samanimate.com">SamAnimate</a>
            <a target="_blank" href="https://shepherdgame.com">Shepherd Game</a>
          </div>
        </div>
      </CenteredColumn>
    </Spaced>
  </EmptyPage>
</>);
