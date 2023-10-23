import { Column, Spaced } from './components/column/column.js';
import { TypicalPage } from './components/page.js';
import { Typography } from './components/typography.js';
import image from './img/categories/classics-big.jpg';

export default <>
  <TypicalPage title="Bible" image={image.path}>

    <Spaced>
      <Column centered>
        <Typography>

          <h2>Bible</h2>

          <h3>Translation</h3>

          <p>My favorite translation of the Bible is
            the <a href="https://www.amazon.com/dp/0898708338">RSV-CE</a>.
          </p>

          <h3>Audio Bible</h3>

          <p>The <strong>Truth and Life Dramatized Audio New Testament</strong> is
            an incredible 22-hour audiobook of the New Testament.</p>

          <p>Professional acting, realistic sound effects, and an amazing score,
            all work together to truly bring the RSVCE translation to life.</p>

          <p>You can get the <a href="https://www.truthandlifeapp.com/">mobile app</a> or
            the <a href="https://www.truthandlifeapp.com/audio.html">18-disc CD set</a>. They also offer
            the <a href="https://www.truthandlifeapp.com/WebBibleTAL/WebPlayer.aspx">Gospel of Mark</a> for
            free, so you can even sample it now on the web.</p>

        </Typography>
      </Column>
    </Spaced>

  </TypicalPage>
</>;
