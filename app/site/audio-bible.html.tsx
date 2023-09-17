import { Column } from "../components/new/column";
import { Navlinks } from "../components/new/navlinks";
import { Page } from "../components/new/page";
import { QuickLinks } from "../components/new/quicklinks";
import { SiteFooter } from "../components/new/site-footer";
import { SiteHeader } from "../components/new/site-header";
import { Typography } from "../components/new/typography";

export default <>
  <Page>
    <main>

      <SiteHeader image='/img/page/audiobible-big.jpg' />
      <Navlinks />

      <Column spaced centered>
        <Typography>

          <h1>Audio Bible</h1>

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

    </main>

    <QuickLinks />
    <SiteFooter />
  </Page>
</>;
