import { Container } from "../../components/container/container";
import { Content } from "../../components/content/content";
import { HeroImage } from "../../components/hero-image/hero-image";
import { QuickLinks } from "../../components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../../components/site";
import { renderElement } from "../../core/jsx";
import { staticRouteFor } from "../../util/static";

export function notFoundPage(input: RouteInput): RouteOutput {
  const title = 'Page not found';
  const image = staticRouteFor(__dir.filesByName['404.jpg']!);
  return {
    status: 404,
    body: renderElement(<Html>
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
    </Html>)
  };
}
