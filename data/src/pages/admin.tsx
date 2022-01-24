import bcrypt from 'bcryptjs';
import { spawnSync } from 'child_process';
import usersFile from 'file:/data/users.json';
import { Routeable } from "../core/router";
import { Head, Html } from "../view/site";
import { Component } from '../view/types';
import { RouteHandler, RouteInput, RouteOutput } from "/../src/http";

export function pullChangesFromGithub() {
  console.log('pullChangesFromGithub(): starting...');
  spawnSync('git pull', { shell: true, stdio: 'inherit' });
  console.log('pullChangesFromGithub(): done');
}

type User = {
  auth: string;
  name: string;
  access: 'all';
};

type AuthedInput = RouteInput & {
  user: User | null;
};

const users: User[] = JSON.parse(usersFile.buffer.toString('utf8'));

function isAdmin(input: RouteInput) {
  const matched = input.headers.authorization?.match(/^Basic (.+)$/);
  if (matched?.[1]) {
    const userpass = Buffer.from(matched[1], 'base64').toString('utf8');
    const user = users.find(existing => bcrypt.compareSync(userpass, existing.auth));
    if (user) return user;
  }
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
      return {
        status: 401,
        body: 'Not authorized.',
        headers: { 'WWW-Authenticate': 'Basic realm="example"' },
      };
    }

    return handler(input);
  });
}

const AdminHeader: Component<{}> = (attrs, children) => {
  return <>
    <div style='display:grid; grid-auto-flow:column; gap:1em; justify-content:start; padding:1em'>
      <a href='/'>Site</a>
      <a href='/admin'>Admin</a>
      <a href="#" id="dark-mode-toggle" data-lightmode="Light mode" data-darkmode="Dark mode"></a>
    </div>
  </>;
};

const adminPage: Routeable = {
  route: '/admin',
  get: guardAuth((input) => {
    return {
      body: <Html>
        <Head title="Admin" />
        <body>
          <AdminHeader />
          <main style='padding:1em'>
            <ul>
              <li><a href='/admin/pull'>Pull changes</a></li>
              <li><a href='/admin/restart'>Restart</a></li>
            </ul>
          </main>
        </body>
      </Html>
    };
  })
};

const restartSiteRoute: Routeable = {
  route: '/admin/restart',
  get: guardAuth((input) => {
    restartSite();
    return {
      status: 302,
      headers: { 'Location': '/admin' },
    };
  })
};

const pullChangesRoute: Routeable = {
  route: '/admin/pull',
  get: guardAuth((input) => {
    pullChangesFromGithub();
    return {
      status: 302,
      headers: { 'Location': '/admin' },
    };
  })
};

export const adminPages: Routeable[] = [
  adminPage,
  restartSiteRoute,
  pullChangesRoute,
];
