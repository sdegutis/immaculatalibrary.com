import { Container } from "../../components/container/container";
import { Content } from "../../components/content/content";
import { SiteCommon } from "../../components/site";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable } from "../../core/router";
import { markdown } from "../../util/helpers";
import { staticRouteFor } from "../../util/static";
import imageFileBig from './adoration-big.jpg';

const devotionsImageBig = staticRouteFor(imageFileBig);

const title = 'Devotions';

const htmlContent = markdown.render(__dir.filesByName['content.md']!.buffer.toString('utf8'));

export const devotionsPage: Routeable = {
  route: '/devotions.html',
  handle: () => {
    return {
      body: renderElement(<SiteCommon
        title={title}
        image={devotionsImageBig}
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

addRouteable(devotionsPage);
