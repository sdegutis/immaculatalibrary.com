import usersFile from 'file:/data/users.json';
import { Routeable } from "../core/router";
import { Container, Content, HeroImage } from '../view/page';
import { QuickLinks } from '../view/quicklinks';
import { Head, Html, SiteFooter, SiteHeader } from '../view/site';
import { RouteHandler, RouteInput, RouteOutput } from "/../src/http";

export type User = {
  auth: string;
  name: string;
  access: 'all';
};

export type AuthedInput = RouteInput & {
  user: User | null;
};

const users: User[] = JSON.parse(usersFile.buffer.toString('utf8'));

function isAdmin(input: RouteInput) {
  // const matched = input.headers.authorization?.match(/^Basic (.+)$/);
  // if (matched?.[1]) {
  //   const userpass = Buffer.from(matched[1], 'base64').toString('utf8');
  //   const user = users.find(existing => bcrypt.compareSync(userpass, existing.auth));
  //   if (user) return user;
  // }
  return null;
}

export function discoverAuth(handler: (input: AuthedInput) => RouteOutput): RouteHandler {
  return input => {
    return handler({ ...input, user: isAdmin(input) });
  };
}

function guardAuth(handler: RouteHandler): RouteHandler {
  return discoverAuth(input => {
    if (input.user?.access !== 'all') {
      const image = '/img/821px-Pope-peter_pprubens.jpg';

      return {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="example"' },
        body: <Html>
          <Head />
          <body>
            <SiteHeader user={input.user} />
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
  get: guardAuth((input) => {
    console.log(input.headers)
    return {
      status: 302,
      headers: { 'Location': input.headers.referer ?? '/' },
    };
  })
};

export const logoutRoute: Routeable = {
  route: '/admin/logout',
  get: guardAuth((input) => {
    return {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="example"',
        'Location': input.headers.referer,
      },
    };
  })
};

export const adminPages: Routeable[] = [
  restartSiteRoute,
  loginRoute,
  logoutRoute,
];
