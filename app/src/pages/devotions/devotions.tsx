import imageFileBig from './adoration-big.jpg';
import imageFileSmall from './adoration-small.jpg';
import { addRouteable, Routeable } from "/src/core/router";
import { staticRouteFor } from "/src/core/static";
import { md } from "/src/util/helpers";
import { Container, Content, HeroImage } from "/src/view/components/page";
import { QuickLinks } from "/src/view/components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "/src/view/components/site";

const devotionsImageBig = staticRouteFor(imageFileBig);
export const devotionsImageSmall = staticRouteFor(imageFileSmall);

const title = 'Devotions';

const htmlContent = md.render(__dir.filesByName['content.md']!.buffer.toString('utf8'));

const page: Routeable = {
  method: 'GET',
  route: '/devotions.html',
  handle: (input) => {
    return {
      body: <Html>
        <Head title={title}>
        </Head>
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={devotionsImageBig} />
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
