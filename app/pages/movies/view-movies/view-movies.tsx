import { EnrichedInput } from "../../../auth/login";
import { Container } from "../../../components/container/container";
import { Content } from "../../../components/content/content";
import { HeroImage } from "../../../components/hero-image/hero-image";
import { QuickLinks } from "../../../components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../../../components/site";
import { addRouteable, Routeable, RouteMethod } from "../../../core/router";
import { Movie } from "../../../model/movies/movie";
import { md } from "../../../util/helpers";
import { renderElement } from "../../../util/jsx";
import { MoviesSidebar } from "../movies-sidebar";

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
      body: renderElement(<Html>
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
      </Html>)
    }
  }

}
