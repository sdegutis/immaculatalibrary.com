import { Container, Content, HeroImage } from "../view/page";
import { QuickLinks } from "../view/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../view/site";
import { AuthedInput } from "./admin";
import { RouteOutput } from "/../src/http";

export function notFoundPage(input: AuthedInput): RouteOutput {
  const title = 'Page not found';
  const image = '/img/404-big.jpg';
  return {
    status: 404,
    body: <Html>
      <Head title={title} />
      <body>
        <SiteHeader user={input.user} />
        <main>
          <HeroImage image={image} />
          <Container>

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
