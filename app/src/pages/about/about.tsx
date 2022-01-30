import { Container, Content } from "../../components/page";
import { QuickLinks } from "../../components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../../components/site";
import { mainSiteHeaderImagePath } from '../home/home';
import { HeroImage } from '/src/components/hero-image/hero-image';
import { addRouteable, Routeable } from "/src/core/router";
import { md } from "/src/util/helpers";

const title = 'About Immaculata Library';

const htmlContent = md.render(__dir.filesByName['content.md']!.buffer.toString('utf8'));

const page: Routeable = {
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
