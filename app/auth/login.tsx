import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { Container } from '../components/container/container';
import { Content } from '../components/content/content';
import { HeroImage } from '../components/hero-image/hero-image';
import { QuickLinks } from '../components/quicklinks';
import { Head, Html, SiteFooter, SiteHeader } from '../components/site';
import { addRouteable, Routeable } from "../core/router";
import { sameSiteReferer } from '../util/helpers';
import { renderElement } from '../util/jsx';
import { staticRouteFor } from '../util/static';

const users: string[] = [
  "$2a$10$Qwea9c8jHbc/UlaAdr66Gumlhs46/VBjyy/xZd92QgJRtytvQs5sm"
];

export const loginRoute: Routeable = {
  route: '/login',
  method: 'GET',
  handle: (input) => {
    const matched = input.headers.authorization?.match(/^Basic (.+)$/);
    if (matched?.[1]) {
      const userpass = Buffer.from(matched[1], 'base64').toString('utf8');
      const isValid = users.some(existing => bcrypt.compareSync(userpass, existing));
      if (isValid) {
        const sessionid = randomUUID();
        persisted.sessions.set(sessionid, {
          isAdmin: true
        });

        return {
          status: 302,
          headers: {
            'Location': sameSiteReferer(input)?.href ?? '/',
            'Set-Cookie': `wwwiii=${sessionid}`,
          }
        };
      }
    }

    return notAllowedResponse(input, true);
  }
};

export const logoutRoute: Routeable = {
  route: '/logout',
  method: 'GET',
  meta: { public: false },
  handle: (input) => {
    return {
      status: 302,
      headers: {
        'Location': sameSiteReferer(input)?.href ?? '/',
        'Set-Cookie': `wwwiii=; Max-Age=1; Path=/`,
      }
    };
  }
};

addRouteable(loginRoute);
addRouteable(logoutRoute);

export function notAllowedResponse(input: RouteInput, login = false) {
  const image = staticRouteFor(__dir.filesByName['image.jpg']!);
  return {
    status: 401,
    headers: (login
      ? { 'WWW-Authenticate': 'Basic realm="Responsibility"' }
      : {}),
    body: renderElement(<Html>
      <Head />
      <body>
        <SiteHeader />
        <main>
          <HeroImage image={image} />
          <Container spaced split>
            <Content>
              <h1>Not Authorized</h1>
              <p>This page is restricted.</p>
            </Content>
          </Container>
        </main>
        <QuickLinks />
        <SiteFooter input={input} />
      </body>
    </Html>),
  };
}
