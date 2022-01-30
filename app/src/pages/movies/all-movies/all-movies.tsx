import { MoviesSidebar } from "../movies-sidebar";
import { Container } from "/src/components/container/container";
import { Content } from "/src/components/content/content";
import { HeroImage } from "/src/components/hero-image/hero-image";
import { QuickLinks } from "/src/components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "/src/components/site";
import { addRouteable, Routeable } from "/src/core/router";
import { allMovies } from "../../../model/movies/movie";
import { randomElement } from "/src/util/helpers";

const allMoviesPage: Routeable = {
  route: `/movies.html`,
  method: 'GET',
  handle: (input) => {
    const title = 'Holy Movies';
    const image = randomElement(allMovies).bigImage;
    return {
      body: <>
        <Html>
          <Head title={title}>
          </Head>
          <body>
            <SiteHeader />
            <main>
              <HeroImage image={image} />
              <Container spaced split>
                <Content>
                  <h1>{title}</h1>
                  <p>
                    Books are not the only way to experience the
                    lives of the saints! Movies can be a great way
                    to increase our devotion and love for God through
                    his Saints. This page contains a roughly priotized
                    list of recommended and reviewed Catholic movies.
                  </p>
                </Content>
                <MoviesSidebar />
              </Container>
            </main>
            <QuickLinks />
            <SiteFooter input={input} />
          </body>
        </Html>
      </>
    };
  },
};

addRouteable(allMoviesPage);
