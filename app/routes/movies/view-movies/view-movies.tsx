import { Container } from "../../../components/container/container";
import { Content } from "../../../components/content/content";
import { SiteCommon } from "../../../components/site";
import { renderElement } from "../../../core/jsx";
import { addRouteable, Routeable } from "../../../core/router";
import { Movie } from "../../../model/movies/movie";
import { markdown } from "../../../util/helpers";
import { MoviesSidebar } from "../movies-sidebar";

export class ViewMovieRoute implements Routeable {

  constructor(private movie: Movie) {
    addRouteable(this);
  }

  get route() {
    return `/movies/${this.movie.slug}.html`;
  }

  handle(): RouteOutput {
    return {
      body: renderElement(<SiteCommon
        title={this.movie.displayTitle}
        image={this.movie.bigImage}
      >
        <Container spaced split>
          <Content>
            <h1>{this.movie.displayTitle}</h1>
            {this.movie.subtitle && <h4><i>{this.movie.subtitle}</i></h4>}
            {markdown.render(this.movie.markdownContent)}
          </Content>
          <MoviesSidebar />
        </Container>
      </SiteCommon>)
    }
  }

}
