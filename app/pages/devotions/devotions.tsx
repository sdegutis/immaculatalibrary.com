import { Container } from "../../components/container/container";
import { Content } from "../../components/content/content";
import { HeroImage } from "../../components/hero-image/hero-image";
import { QuickLinks } from "../../components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../../components/site";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable } from "../../core/router";
import { md } from "../../util/helpers";
import { staticRouteFor } from "../../util/static";
import imageFileBig from './adoration-big.jpg';

const devotionsImageBig = staticRouteFor(imageFileBig);

const title = 'Devotions';

const htmlContent = md.render(__dir.filesByName['content.md']!.buffer.toString('utf8'));

export const devotionsPage: Routeable = {
  method: 'GET',
  route: '/devotions.html',
  handle: (input) => {
    return {
      body: renderElement(<Html>
        <Head title={title}>
        </Head>
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={devotionsImageBig} />
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
      </Html>)
    };
  },
};

addRouteable(devotionsPage);
