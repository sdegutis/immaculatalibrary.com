import { EnrichedInput } from "../../auth/login";
import { Container, Content } from "../../components/container/container";
import { QuickLinks } from "../../components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../../components/site";
import { HeroImage } from "/src/components/hero-image/hero-image";
import { staticRouteFor } from "/src/core/static";

export function notFoundPage(input: EnrichedInput): RouteOutput {
  const title = 'Page not found';
  const image = staticRouteFor(__dir.filesByName['404.jpg']!);
  return {
    status: 404,
    body: <Html>
      <Head title={title} />
      <body>
        <SiteHeader />
        <main>
          <HeroImage image={image} />
          <Container spaced split>

            <Content>
              <h1>{title}</h1>
              <p>Sorry, couldn't find this page.</p>
            </Content>

          </Container>
        </main>
        <QuickLinks />
        <SiteFooter input={input} />
      </body>
    </Html>
  };
}
