import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import usersFile from 'file:/data/users.json';
import { Routeable } from "../core/router";
import { sameSiteReferer } from '../util/helpers';
import { Container, Content, HeroImage } from '../view/components/page';
import { QuickLinks } from '../view/components/quicklinks';
import { Head, Html, SiteFooter, SiteHeader } from '../view/components/site';

const users: string[] = JSON.parse(usersFile.buffer.toString('utf8'));

interface Session {
  isAdmin: boolean;
}

export type EnrichedInput = RouteInput & {
  session: Session | null;
};

persisted.sessions ??= new Map<string, Session>();

type EnrichedRouteHandler = (input: EnrichedInput) => RouteOutput;

export function enrichAuth(handler: EnrichedRouteHandler): RouteHandler {
  return input => {
    const cookieKvs = input.headers.cookie?.split('; ');
    const cookiePairs = cookieKvs?.map(kv => kv.split('=') as [string, string]);
    const cookies = cookiePairs && Object.fromEntries(cookiePairs);
    const sessionId = cookies?.['wwwiii'] || null;
    const session = sessionId ? persisted.sessions.get(sessionId) ?? null : null;
    return handler({ ...input, session });
  };
}

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
  route: '/admin/logout',
  method: 'GET',
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

export const adminPageRoutes: Routeable[] = [
  loginRoute,
  logoutRoute,
];

export function notAllowedResponse(input: EnrichedInput, login = false) {
  const image = '/img/821px-Pope-peter_pprubens.jpg';
  return {
    status: 401,
    headers: (login
      ? { 'WWW-Authenticate': 'Basic realm="Responsibility"' }
      : {}),
    body: <Html>
      <Head />
      <body>
        <SiteHeader />
        <main>
          <HeroImage image={image} />
          <Container>
            <Content>
              <h1>Not Authorized</h1>
              <p>This page is restricted.</p>
            </Content>
          </Container>
        </main>
        <QuickLinks />
        <SiteFooter input={input} />
      </body>
    </Html>,
  };
}
