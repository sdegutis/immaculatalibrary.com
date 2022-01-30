import { Container, Content } from "../../components/page";
import { QuickLinks } from "../../components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../../components/site";
import imageFile from './music.jpg';
import { HeroImage } from '/src/components/hero-image/hero-image';
import { addRouteable, Routeable } from "/src/core/router";
import { staticRouteFor } from "/src/core/static";
import { md } from "/src/util/helpers";

export const audioBibleImage = staticRouteFor(imageFile);

const title = 'Sacred Music';

const htmlContent = md.render(__dir.filesByName['content.md']!.buffer.toString('utf8'));

const page: Routeable = {
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
            <Container>
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
