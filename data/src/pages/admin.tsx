import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import usersFile from 'file:/data/users.json';
import { Routeable } from "../core/router";
import { Container, Content, HeroImage } from '../view/page';
import { QuickLinks } from '../view/quicklinks';
import { Head, Html, SiteFooter, SiteHeader } from '../view/site';
import { RouteHandler, RouteInput, RouteOutput } from "/../src/http";

const users: string[] = JSON.parse(usersFile.buffer.toString('utf8'));

export type EnrichedInput = RouteInput & {
  session: Session | null;
};

persisted.sessions ??= new Map<string, Session>();

export function enrichAuth(handler: (input: EnrichedInput) => RouteOutput): RouteHandler {
  return input => {
    return handler({ ...input, session: null });
    // const cookieKvs = input.headers.cookie?.split('; ');
    // const cookiePairs = cookieKvs?.map(kv => kv.split('=') as [string, string]);
    // const cookies = cookiePairs && Object.fromEntries(cookiePairs);
    // const isAdmin = (!!cookies?.['wwwiii'] && persisted.sessions.get(cookies['wwwiii'])?.isAdmin) ?? false;
    // return handler({ ...input, session: persisted.sessions.get(cookies['wwwiii']) });
  };
}

function guardAuth(handler: RouteHandler): RouteHandler {
  return enrichAuth(input => {
    if (input.isAdmin) {
      return notAllowedResponse();
    }

    return handler(input);
  });
}

export const restartSiteRoute: Routeable = {
  route: '/admin/restart',
  get: guardAuth((input) => {
    restartSite();
    return {
      status: 302,
      headers: { 'Location': input.headers.referer },
    };
  })
};

export const loginRoute: Routeable = {
  route: '/login',
  get: (input) => {
    const matched = input.headers.authorization?.match(/^Basic (.+)$/);
    if (matched?.[1]) {
      const userpass = Buffer.from(matched[1], 'base64').toString('utf8');
      const isValid = users.some(existing => bcrypt.compareSync(userpass, existing));
      if (isValid) {
        const sessionid = randomUUID();
        persisted.sessions.set(sessionid, { isAdmin: true });

        return {
          status: 302,
          headers: {
            'Location': '/',
            'Set-Cookie': `wwwiii=${sessionid}`,
          }
        };
      }
    }

    return notAllowedResponse();
  }
};

export const logoutRoute: Routeable = {
  route: '/admin/logout',
  get: (input) => {
    return {
      status: 302,
      headers: {
        'Location': '/hmm',
        'Set-Cookie': `wwwiii=foo; max-age=0`,
      }
    };
  }
};

export const adminPages: Routeable[] = [
  restartSiteRoute,
  loginRoute,
  logoutRoute,
];

function notAllowedResponse() {
  const image = '/img/821px-Pope-peter_pprubens.jpg';
  return {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="example"' },
    body: <Html>
      <Head />
      <body>
        <SiteHeader isAdmin={false} />
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
        <SiteFooter />
      </body>
    </Html>,
  };
}
