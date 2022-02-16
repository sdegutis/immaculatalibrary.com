import { Container } from '../../components/container/container';
import { Content } from '../../components/content/content';
import { SiteCommon } from '../../components/site';
import { renderElement } from '../../core/jsx';
import { staticRouteFor } from '../static';

export function notAllowedResponse(input: RouteInput, login = false) {
  const image = staticRouteFor(__dir.filesByName['image.jpg']!);
  return {
    status: 401,
    headers: (login
      ? { 'WWW-Authenticate': 'Basic realm="Responsibility"' }
      : {}),
    body: renderElement(<SiteCommon
      title='Not Authorized'
      image={image}
      input={input}
    >
      <Container spaced split>
        <Content>
          <h1>Not Authorized</h1>
          <p>This page is restricted.</p>
        </Content>
      </Container>
    </SiteCommon>),
  };
}
