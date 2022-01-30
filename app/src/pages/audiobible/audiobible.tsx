import { Container, Content } from "../../components/container/container";
import { QuickLinks } from "../../components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../../components/site";
import imageFileBig from './audiobible-big.jpg';
import imageFileSmall from './audiobible-small.jpg';
import { HeroImage } from '/src/components/hero-image/hero-image';
import { addRouteable, Routeable } from "/src/core/router";
import { staticRouteFor } from "/src/core/static";
import { md } from "/src/util/helpers";

export const audioBibleImageBig = staticRouteFor(imageFileBig);
export const audioBibleImageSmall = staticRouteFor(imageFileSmall);

const title = 'Audio Bible';

const htmlContent = md.render(__dir.filesByName['content.md']!.buffer.toString('utf8'));

const page: Routeable = {
  method: 'GET',
  route: '/audio-bible.html',
  handle: (input) => {
    return {
      body: <Html>
        <Head title={title}>
        </Head>
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={audioBibleImageBig} />
            <Container spaced split>
              <Content>
                <h1>{title}</h1>
                {htmlContent}
              </Content>
            </Container>
          </main>
          <QuickLinks />
          <SiteFooter input={input} />
        </body>
      </Html>
    };
  },
};

addRouteable(page);
