import { Container } from "../../components/container/container";
import { Content } from "../../components/content/content";
import { SiteCommon } from "../../components/site";
import { renderElement } from "../../core/jsx";
import { staticRouteFor } from "../../util/static";

export function notFoundPage(input: RouteInput): RouteOutput {
  const title = 'Page not found';
  const image = staticRouteFor(__dir.filesByName['404.jpg']!);
  return {
    status: 404,
    body: renderElement(<SiteCommon
      title={title}
      image={image}
      input={input}
    >
      <Container spaced split>

        <Content>
          <h1>{title}</h1>
          <p>Sorry, couldn't find this page.</p>
        </Content>

      </Container>
    </SiteCommon>)
  };
}
