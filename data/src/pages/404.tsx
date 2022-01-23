import { Container, Content, HeroImage } from "../view/page";
import { QuickLinks } from "../view/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../view/site";
import { RouteInput, RouteOutput } from "/../src/http";

export function notFoundPage(input: RouteInput): RouteOutput {
  const title = 'Page not found';
  const image = '/img/404-big.jpg';
  return {
    body: <Html>
      <Head title={title} />
      <body>
        <SiteHeader />
        <main>
          <HeroImage image={image} />
          <Container sectionId='category'>

            <Content>
              <h1>{title}</h1>
              <p>Sorry, couldn't find this page.</p>
            </Content>

          </Container>
        </main>
        <QuickLinks />
        <SiteFooter />
      </body>
    </Html>
  };
}
