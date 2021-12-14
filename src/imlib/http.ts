import express from 'express';
import { URLSearchParams } from 'url';


export class RoutingMiddleware {

  routes = new Map<string, express.Handler>();
  middleware: express.Handler = (req, res, next) => {
    const path = `${req.method} ${req.path}`;
    const handler = this.routes.get(path);
    if (!handler) {
      res.status(404).send(`no route: ${path}`);
      return;
    }
    handler(req, res, next);
  };

}

export const alwaysTextBodies = express.text({ type: '*/*' });

export const redirectFinalSlash: express.Handler = (req, res, next) => {
  if (req.path.endsWith('/') && req.path !== '/') {
    res.redirect(req.path.slice(0, -1));
  }
  else {
    next();
  }
};

export function makeHandler(fn: Function): express.Handler {
  return async (req, res) => {

    const request = {
      query: () => req.query,
      text: () => req.body,
      json: () => JSON.parse(req.body),
      form: () => new URLSearchParams(req.body),
      headers: () => req.headers,
      session: req.session,
    };

    let response;
    try {
      response = fn(request);
    }
    catch (e) {
      res.status(500).send('Error');
      console.error(e);
      return;
    }

    response = await Promise.resolve(response);
    if (typeof response !== 'object') {
      response = { text: String(response) };
    }

    if ('status' in response) {
      res.status(response.status);
    }

    if ('headers' in response) {
      for (const [k, v] of Object.entries<any>(response.headers)) {
        res.setHeader(k, v);
      }
    }

    if ('redirect' in response) {
      res.redirect(response.redirect);
    }
    else if ('text' in response) {
      res.send(response.text);
    }
    else if ('json' in response) {
      res.json(response.json);
    }
  };
}
