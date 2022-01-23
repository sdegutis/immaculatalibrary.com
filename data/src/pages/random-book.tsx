import { Routeable } from "../core/router";
import { allBooks } from "../model/book";
import { Container, Content, HeroImage } from "../view/page";
import { QuickLinks } from "../view/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../view/site";

export const randomBookPage: Routeable = {
  route: '/random.html',
  get: (input) => {
    const title = 'Random Book';
    const image = '/img/reference-big.jpg';

    const i = Math.floor(Math.random() * allBooks.length);
    const book = allBooks[i]!;

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
                <script>{`document.addEventListener('DOMContentLoaded', () => { window.location.href = '${book.route}'; });`}</script>
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
