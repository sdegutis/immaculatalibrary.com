import { Routeable } from "../core/router";
import { allSnippets } from "../model/snippet";
import { Container, Content, HeroImage } from "../view/page";
import { QuickLinks } from "../view/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../view/site";

export const randomSnippetPage: Routeable = {
  route: '/random-book-snippet.html',
  get: (input) => {
    const title = 'Random Book Snippet';
    const image = '/img/reference-big.jpg';

    const i = Math.floor(Math.random() * allSnippets.length);
    const snippet = allSnippets[i]!;

    return {
      body: <Html>
        <Head title={title} />
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={image} />
            <Container>
              <Content>
                <h1>{title}</h1>
                <p><i>Redirecting...</i></p>
                <script>{`document.addEventListener('DOMContentLoaded', () => { window.location.href = '${snippet.route}'; });`}</script>
              </Content>
            </Container>
          </main>
          <QuickLinks />
          <SiteFooter />
        </body>
      </Html>
    };
  },
}
