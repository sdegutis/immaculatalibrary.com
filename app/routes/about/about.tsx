import { Container } from "../../components/container/container";
import { Content } from "../../components/content/content";
import { SiteCommon } from "../../components/site";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable } from "../../core/router";
import { markdown } from "../../util/helpers";
import { mainSiteHeaderImagePath } from '../home/home';

const title = 'About Immaculata Library';

const htmlContent = markdown.render(__dir.filesByName['content.md']!.buffer.toString('utf8'));

export const aboutPage: Routeable = {
  method: 'GET',
  route: '/about.html',
  handle: () => {
    return {
      body: renderElement(<SiteCommon
        title={title}
        image={mainSiteHeaderImagePath}
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

addRouteable(aboutPage);
