import { Container } from "../../components/container/container";
import { SiteCommon } from "../../components/site";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable, RouteMethod } from "../../core/router";
import { Tag } from "../../model/snippets/tag";
import { groupByDate } from "../../util/helpers";
import { SnippetsGroups } from "./latest-list";

const slugify = (str: string) => str.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');

export class ViewTagRoute implements Routeable {

  route: string;
  method: RouteMethod = 'GET';

  constructor(
    private tag: Tag,
  ) {
    this.route = `/book-snippets/tag/${slugify(this.tag.slug)}.html`;
    addRouteable(this);
  }

  handle(input: RouteInput): RouteOutput {
    const title = `${this.tag.name} Book Snippets`;

    const [randomSnippet] = this.tag.snippets;
    const image = randomSnippet!.book.category.imageBig;

    const groups = Object.entries(groupByDate([...this.tag.snippets]));

    return {
      body: renderElement(<>
        <SiteCommon
          title={title}
          image={image}
          input={input}
        >
          <Container spaced split>

            <div>
              <h1>{title}</h1>
              <SnippetsGroups groups={groups} />
            </div>

          </Container>
        </SiteCommon>
      </>)
    };
  }

}
