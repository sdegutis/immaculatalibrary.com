import imageFile from './music.jpg';
import { addRouteable, Routeable } from "/src/core/router";
import { staticRouteFor } from "/src/core/static";
import { md } from "/src/util/helpers";
import { Container, Content, HeroImage } from "/src/view/components/page";
import { QuickLinks } from "/src/view/components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "/src/view/components/site";

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
