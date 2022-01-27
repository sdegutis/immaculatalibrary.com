import { RouteOutput } from "/src/http";
import { Container, Content, HeroImage } from "../view/components/page";
import { QuickLinks } from "../view/components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../view/components/site";
import { EnrichedInput } from "./admin";

export function errorPage(input: EnrichedInput): RouteOutput {
  const title = 'Something went wrong';
  const image = '/img/404-big.jpg';
  return {
    status: 500,
    body: <Html>
      <Head title={title} />
      <body>
        <SiteHeader />
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
        <SiteFooter input={input} />
      </body>
    </Html>
  };
}
