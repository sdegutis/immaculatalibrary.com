import { EnrichedInput } from "../../auth/login";
import { Container } from "../../components/container/container";
import { Content } from "../../components/content/content";
import { HeroImage } from "../../components/hero-image/hero-image";
import { QuickLinks } from "../../components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../../components/site";
import { renderElement } from "../../util/jsx";
import { staticRouteFor } from "../../util/static";

export function errorPage(input: EnrichedInput): RouteOutput {
  const title = 'Something went wrong';
  const image = staticRouteFor(__dir.filesByName['404.jpg']!);
  return {
    status: 500,
    body: renderElement(<Html>
      <Head title={title} />
      <body>
        <SiteHeader />
        <main>
          <HeroImage image={image} />
          <Container spaced split>

            <Content>
              <h1>{title}</h1>
              <p>Sorry, this page had an error. Try again later.</p>
            </Content>

          </Container>
        </main>
        <QuickLinks />
        <SiteFooter input={input} />
      </body>
    </Html>)
  };
}
