import { Container } from "../../components/container/container";
import { Content } from "../../components/content/content";
import { HeroImage } from "../../components/hero-image/hero-image";
import { QuickLinks } from "../../components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../../components/site";
import { addRouteable, Routeable } from "../../core/router";
import { md } from "../../util/helpers";
import { staticRouteFor } from "../../util/static";
import imageFile from './music.jpg';

export const audioBibleImage = staticRouteFor(imageFile);

const title = 'Sacred Music';

const htmlContent = md.render(__dir.filesByName['content.md']!.buffer.toString('utf8'));

export const musicPage: Routeable = {
  method: 'GET',
  route: '/music.html',
  handle: (input) => {
    return {
      body: <Html>
        <Head title={title}>
        </Head>
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={audioBibleImage} />
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

addRouteable(musicPage);
