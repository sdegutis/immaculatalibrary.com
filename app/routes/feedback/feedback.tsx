import { Container } from "../../components/container/container";
import { Content } from "../../components/content/content";
import { SiteCommon } from "../../components/site";
import { renderElement } from "../../core/jsx";
import { addRouteable, Routeable } from "../../core/router";
import { staticRouteFor } from "../../util/static";

const sendFeedback: Routeable = {
  method: 'POST',
  route: '/send-feedback',
  handle: input => {
    const form = new URLSearchParams(input.body.toString('utf8'));

    console.log('--- Feedback ---\n\n' + form.get('feedback') + '\n');
    console.log('--- End Feedback ---');

    const title = 'Feedback received';
    const image = staticRouteFor(__dir.find('../errors/404.jpg') as FsFile);
    return {
      body: renderElement(<SiteCommon
        title={title}
        image={image}
        input={input}
      >
        <Container spaced split>
          <Content>
            <h1>{title}</h1>
            <p>Thanks for submitting your feedback. It has been received and will be read shortly.</p>
          </Content>
        </Container>
      </SiteCommon>)
    };
  },
};

addRouteable(sendFeedback);