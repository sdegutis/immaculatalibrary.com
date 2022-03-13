import { Container } from "../../components/container/container";
import { Content } from "../../components/content/content";
import { SiteCommon } from "../../components/site";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable } from "../../core/router";
import { markdown } from "../../util/helpers";
import { staticRouteFor } from "../../util/static";
import imageFileBig from './audiobible-big.jpg';
import imageFileSmall from './audiobible-small.jpg';

export const audioBibleImageBig = staticRouteFor(imageFileBig);
export const audioBibleImageSmall = staticRouteFor(imageFileSmall);

const title = 'Audio Bible';

const htmlContent = markdown.render(__dir.filesByName['content.md']!.buffer.toString('utf8'));

export const audioBiblePage: Routeable = {
  method: 'GET',
  route: '/audio-bible.html',
  handle: (input) => {
    return {
      body: renderElement(<SiteCommon
        title={title}
        image={audioBibleImageBig}
        input={input}
      >
        <Container spaced centered>
          <Content>
            <h1>{title}</h1>
            {htmlContent}
          </Content>
        </Container>
      </SiteCommon>)
    };
  },
};

addRouteable(audioBiblePage);
