import { Container, Content, HeroImage } from "../view/page";
import { QuickLinks } from "../view/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../view/site";
import { EnrichedInput } from "./admin";
import { RouteOutput } from "/../src/http";

export function errorPage(input: EnrichedInput): RouteOutput {
  const title = 'Something went wrong';
  const image = '/img/404-big.jpg';
  return {
    status: 500,
    body: <Html>
      <Head title={title} />
      <body>
        <SiteHeader input={input} />
        <main>
          <HeroImage image={image} />
          <Container>

            <Content>
              <h1>{title}</h1>
              <p>Sorry, this page had an error. Try again later.</p>
            </Content>

          </Container>
        </main>
        <QuickLinks />
        <SiteFooter />
      </body>
    </Html>
  };
}
