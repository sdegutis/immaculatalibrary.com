import express from 'express';
import { URLSearchParams } from 'url';

export type AsyncHandler = (req: express.Request, res: express.Response) => Promise<void>;

export class RoutingMiddleware {

  routes = new Map<string, AsyncHandler>();
  middleware: express.Handler = (req, res) => {
    const path = `${req.method} ${req.path}`;
    const handler = this.routes.get(path) ?? this.routes.get(`GET /404.html`);
    if (!handler) {
      res.status(404).send(`Page not found.`);
      return;
    }

    handler(req, res).catch(e => {
      console.error('Error handling route');
      console.error(e);

      const handler = this.routes.get(`GET /500.html`);
      if (!handler) {
        console.error('No error handling route');
        console.error(e);

        res.status(500).send("An error occurred.");
        return;
      }

      handler(req, res).catch(e => {
        console.error('Error handling error!');
        console.error(e);

        res.status(500).send("An error occurred.");
        return;
      });
    });
  };

}

export function makeHandler(fn: Function): AsyncHandler {
  return async (req, res) => {

    const request = {
      query: () => req.query,
      text: () => req.body,
      json: () => JSON.parse(req.body),
      form: () => new URLSearchParams(req.body),
      headers: () => req.headers,
      session: req.session,
    };

    let response = await fn(request);

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
