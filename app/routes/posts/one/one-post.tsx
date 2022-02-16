import { Container } from "../../../components/container/container";
import { Content } from "../../../components/content/content";
import { SiteCommon } from "../../../components/site";
import { renderElement } from "../../../core/jsx";
import { addRouteable, Routeable, RouteMeta, RouteMethod } from "../../../core/router";
import { Post } from "../../../model/posts/post";
import { calculateReadingMins, formatDate, markdown } from "../../../util/helpers";
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

  handle(input: RouteInput): RouteOutput {
    return {
      body: renderElement(<SiteCommon
        title={this.post.title}
        image={this.post.imageBig}
        input={input}
      >
        <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['post.css']!)} />
        <Container spaced split>
          <Content>
            <h1>{markdown.renderInline(this.post.title)}</h1>

            <p class="date">
              {formatDate(this.post.date)} &bull; {calculateReadingMins(this.post.markdownContent)} min
            </p>

            {markdown.render(this.post.markdownContent)}
          </Content>
        </Container>
      </SiteCommon>)
    }
  }

}
