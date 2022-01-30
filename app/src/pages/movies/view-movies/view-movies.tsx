import { MoviesSidebar } from "../movies-sidebar";
import { EnrichedInput } from "/src/auth/login";
import { Container } from "/src/components/container/container";
import { Content } from "/src/components/content/content";
import { HeroImage } from "/src/components/hero-image/hero-image";
import { QuickLinks } from "/src/components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "/src/components/site";
import { addRouteable, Routeable, RouteMethod } from "/src/core/router";
import { Movie } from "/src/model/movie";
import { md } from "/src/util/helpers";

export class ViewMovieRoute implements Routeable {

  constructor(private movie: Movie) {
    addRouteable(this);
  }

  get route() {
    return `/movies/${this.movie.slug}.html`;
  }

  method: RouteMethod = 'GET';

  handle(input: EnrichedInput): RouteOutput {
    return {
      body: <Html>
        <Head title={this.movie.displayTitle}>
        </Head>
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={this.movie.bigImage} />
            <Container spaced split>
              <Content>
                <h1>{this.movie.displayTitle}</h1>
                {this.movie.subtitle && <h4><i>{this.movie.subtitle}</i></h4>}
                {md.render(this.movie.markdownContent)}
              </Content>
              <MoviesSidebar />
            </Container>
          </main>
          <QuickLinks />
          <SiteFooter input={input} />
        </body>
      </Html>
    }
  }

}
