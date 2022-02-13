import { Container } from '../../components/container/container';
import { Content } from '../../components/content/content';
import { HeroImage } from '../../components/hero-image/hero-image';
import { QuickLinks } from '../../components/quicklinks';
import { Head, Html, SiteFooter, SiteHeader } from '../../components/site';
import { renderElement } from '../../core/jsx';
import { staticRouteFor } from '../static';

export function notAllowedResponse(input: RouteInput, login = false) {
  const image = staticRouteFor(__dir.filesByName['image.jpg']!);
  return {
    status: 401,
    headers: (login
      ? { 'WWW-Authenticate': 'Basic realm="Responsibility"' }
      : {}),
    body: renderElement(<Html>
      <Head />
      <body>
        <SiteHeader />
        <main>
          <HeroImage image={image} />
          <Container spaced split>
            <Content>
              <h1>Not Authorized</h1>
              <p>This page is restricted.</p>
            </Content>
          </Container>
        </main>
        <QuickLinks />
        <SiteFooter input={input} />
      </body>
    </Html>),
  };
}
