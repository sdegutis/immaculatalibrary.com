import { Container } from "../../components/container/container";
import { Content } from "../../components/content/content";
import { HeroImage } from "../../components/hero-image/hero-image";
import { QuickLinks } from "../../components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../../components/site";
import { addRouteable, Routeable } from "../../core/router";
import { renderElement } from "../../util/jsx";
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
      body: renderElement(<Html>
        <Head title={title} />
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={image} />
            <Container spaced split>
              <Content>
                <h1>{title}</h1>
                <p>Thanks for submitting your feedback. It has been received and will be read shortly.</p>
              </Content>
            </Container>
          </main>
          <QuickLinks />
          <SiteFooter input={input} />
        </body>
      </Html>)
    };
  },
};

addRouteable(sendFeedback);
