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
  return (req, res) => {

    const request = {
      query: () => req.query,
      text: () => req.body,
      json: () => JSON.parse(req.body),
      form: () => new URLSearchParams(req.body),
      headers: () => req.headers,
    };

    const response = {
      redirect(location: string, status?: number) {
        if (status !== undefined) res.status(status);
        res.redirect(location);
      },
      text(string: string, status?: number) {
        if (status !== undefined) res.status(status);
        res.send(string);
      },
      json(json: any, status?: number) {
        if (status !== undefined) res.status(status);
        res.json(json);
      },
      setHeader(key: string, val: string) {
        res.setHeader(key, val);
      },
    };

    const session = (req as any).session;

    const result = fn({ request, response, session });
    if (typeof result !== 'undefined') {
      response.text(String(result));
    }

  };
}
