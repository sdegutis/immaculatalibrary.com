import { Container } from "../../components/container/container";
import { Content } from "../../components/content/content";
import { SiteCommon } from "../../components/site";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable } from "../../core/router";
import { markdown } from "../../util/helpers";
import { staticRouteFor } from "../../util/static";
import { MusicSidebar } from "./music-sidebar";
import imageFile from './music.jpg';

export const audioBibleImage = staticRouteFor(imageFile);

const title = 'Sacred Music';

const htmlContent = markdown.render(__dir.filesByName['content.md']!.buffer.toString('utf8'));

export const musicPage: Routeable = {
  method: 'GET',
  route: '/music.html',
  handle: () => {
    return {
      body: renderElement(<SiteCommon
        title={title}
        image={audioBibleImage}
      >
        <Container spaced split>
          <Content>
            <h1>{title}</h1>
            {htmlContent}
          </Content>
          <MusicSidebar />
        </Container>
      </SiteCommon>)
    };
  },
};

addRouteable(musicPage);
