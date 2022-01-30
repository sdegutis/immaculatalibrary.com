import { Container } from "../../../components/container/container";
import { EnrichedInput } from "/src/auth/login";
import { Content } from "/src/components/content/content";
import { HeroImage } from "/src/components/hero-image/hero-image";
import { QuickLinks } from "/src/components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "/src/components/site";
import { addRouteable, Routeable, RouteMethod } from "/src/core/router";
import { staticRouteFor } from "../../../util/static";
import { Post } from "/src/model/post";
import { format_date, md, reading_mins } from "/src/util/helpers";

export class ViewPostPage implements Routeable {

  constructor(private post: Post) {
    addRouteable(this);
  }

  get route() {
    return `/posts/${this.post.date}-${this.post.slug}.html`;
  }

  method: RouteMethod = 'GET';

  handle(input: EnrichedInput): RouteOutput {
    return {
      body: <Html>
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
      </Html>
    }
  }

}
