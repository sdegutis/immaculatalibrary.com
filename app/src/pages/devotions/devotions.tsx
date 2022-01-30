import imageFileBig from './adoration-big.jpg';
import { addRouteable, Routeable } from "/src/core/router";
import { staticRouteFor } from "/src/core/static";
import { md } from "/src/util/helpers";
import { Container, Content, HeroImage } from "../../components/page";
import { QuickLinks } from "../../components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../../components/site";

const devotionsImageBig = staticRouteFor(imageFileBig);

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
