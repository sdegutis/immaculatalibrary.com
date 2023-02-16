import * as bcrypt from 'bcryptjs';
import { randomUUID } from "crypto";
import { addRouteable, Routeable } from "../../core/router";
import { sameSiteReferer } from "../../util/helpers";
import { notAllowedResponse } from "../../util/restricted/login";

const users: string[] = [
  "$2a$10$Qwea9c8jHbc/UlaAdr66Gumlhs46/VBjyy/xZd92QgJRtytvQs5sm",
  "$2a$10$FombUytLvlQ3qESBhIsziOmGTFMiiHTd4eufhANnbxNW8iELR74Em",
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
        persisted.sessions!.set(sessionid, {
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
