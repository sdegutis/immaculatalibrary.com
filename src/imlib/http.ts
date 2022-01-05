import express from 'express';
import { URLSearchParams } from 'url';
import { ViewSite } from './site';

export type AsyncHandler = (req: express.Request, res: express.Response) => Promise<void>;

export class RoutingMiddleware {

  routes = new Map<string, AsyncHandler>();
  notFoundHandler: AsyncHandler | undefined;
  middleware: express.Handler = (req, res) => {
    const path = `${req.method} ${req.path}`;
    const handler = this.routes.get(path) ?? this.notFoundHandler;
    if (!handler) {
      res.status(404).send(`Page not found.`);
      return;
    }

    handler(req, res).catch(e => {
      console.error('Error handling error!');
      console.error(e);
      res.status(500).send("An error occurred.");
    });
  };

}

export function makeHandler(fn: Function, onRouteError: any, viewSite: ViewSite): AsyncHandler {
  return async (req, res) => {

    const request = {
      path: () => req.path,
      query: () => req.query,
      text: () => req.body,
      json: () => JSON.parse(req.body),
      form: () => new URLSearchParams(req.body),
      headers: () => req.headers,
      session: req.session,
    };

    let response;
    try {
      response = await fn(request);
    }
    catch (e) {
      if (typeof onRouteError === 'function') {
        response = onRouteError(request, e);
      }
      else {
        throw e;
      }
    }

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

    viewSite.rebuildIfNeeded();
  };
}
