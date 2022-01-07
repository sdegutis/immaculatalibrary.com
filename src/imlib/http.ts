import express from 'express';
import { URLSearchParams } from 'url';
import { Updater } from './updater';

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
      console.error(e);
      res.status(500).send("An error occurred.");
    });
  };

}

export function makeHandler(fn: Function, onRouteError: any, updater: Updater): AsyncHandler {
  return async (req, res) => {

    const input = {
      path: () => req.path,
      query: () => req.query,
      text: () => req.body,
      json: () => JSON.parse(req.body),
      form: () => new URLSearchParams(req.body),
      headers: () => req.headers,
      session: req.session,
    };

    let output;
    try {
      output = await fn(input);
    }
    catch (e) {
      if (typeof onRouteError === 'function') {
        output = onRouteError(input, e);
      }
      else {
        throw e;
      }
    }

    if (typeof output !== 'object') {
      output = { text: String(output) };
    }

    if ('status' in output) {
      res.status(output.status);
    }

    if ('headers' in output) {
      for (const [k, v] of Object.entries<any>(output.headers)) {
        res.setHeader(k, v);
      }
    }

    if ('redirect' in output) {
      res.redirect(output.redirect);
    }
    else if ('text' in output) {
      res.send(output.text);
    }
    else if ('json' in output) {
      res.json(output.json);
    }

    updater.rebuildIfNeeded();
  };
}
