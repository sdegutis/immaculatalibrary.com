import { EnrichedInput } from "../../../auth/login";
import { Container } from "../../../components/container/container";
import { Content } from "../../../components/content/content";
import { HeroImage } from "../../../components/hero-image/hero-image";
import { QuickLinks } from "../../../components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../../../components/site";
import { addRouteable, Routeable, RouteMeta, RouteMethod } from "../../../core/router";
import { Post } from "../../../model/posts/post";
import { format_date, md, reading_mins } from "../../../util/helpers";
import { renderElement } from "../../../util/jsx";
import { staticRouteFor } from "../../../util/static";

export class ViewPostPage implements Routeable {

  meta: RouteMeta;
  constructor(private post: Post) {
    addRouteable(this);
    this.meta = { lastModifiedDate: this.post.date };
  }

  get route() {
    return `/posts/${this.post.date}-${this.post.slug}.html`;
  }

  method: RouteMethod = 'GET';

  handle(input: EnrichedInput): RouteOutput {
    return {
      body: renderElement(<Html>
        <Head title={this.post.title}>
          <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['post.css']!)} />
        </Head>
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={this.post.imageBig} />
            <Container spaced split>
              <Content>
                <h1>{md.renderInline(this.post.title)}</h1>

                <p class="date">
                  {format_date(this.post.date)} &bull; {reading_mins(this.post.markdownContent)} min
                </p>

                {md.render(this.post.markdownContent)}
              </Content>
            </Container>
          </main>
          <QuickLinks />
          <SiteFooter input={input} />
        </body>
      </Html>)
    }
  }

}
