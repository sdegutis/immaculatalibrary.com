import { Container } from "../../../components/container/container";
import { Content } from "../../../components/content/content";
import { SiteCommon } from "../../../components/site";
import { renderElement } from "../../../core/jsx";
import { addRouteable, Routeable } from "../../../core/router";
import { allCategories } from "../../../model/models";
import { Post } from "../../../model/post";
import { calculateReadingMins, formatDate, markdown } from "../../../util/helpers";
import { staticRouteFor } from "../../../util/static";

export class ViewPostPage implements Routeable {

  lastModifiedDate;

  constructor(private post: Post) {
    addRouteable(this);
    this.lastModifiedDate = this.post.date;
  }

  get route() {
    return `/articles/${this.post.date}-${this.post.slug}.html`;
  }

  handle(): RouteOutput {
    const image = allCategories.find(cat => cat.slug === 'devotion')!.imageBig;
    return {
      body: renderElement(<SiteCommon
        title={this.post.title}
        image={image}
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
