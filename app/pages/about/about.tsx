import { Container } from "../../components/container/container";
import { Content } from "../../components/content/content";
import { HeroImage } from "../../components/hero-image/hero-image";
import { QuickLinks } from "../../components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../../components/site";
import { addRouteable, Routeable } from "../../core/router";
import { md } from "../../util/helpers";
import { mainSiteHeaderImagePath } from '../home/home';

const title = 'About Immaculata Library';

const htmlContent = md.render(__dir.filesByName['content.md']!.buffer.toString('utf8'));

export const aboutPage: Routeable = {
  method: 'GET',
  route: '/about.html',
  handle: (input) => {
    return {
      body: <Html>
        <Head title={title}>
        </Head>
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={mainSiteHeaderImagePath} />
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

addRouteable(aboutPage);
