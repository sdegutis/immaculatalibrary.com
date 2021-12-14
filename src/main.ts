import * as imlib from './imlib';
import bcrypt from 'bcryptjs';
import Chance from 'chance';
import cookieSession from 'cookie-session';
import escapeHtml from 'escape-html';
import express from 'express';
import MarkdownIt from 'markdown-it';
import 'source-map-support/register';
import { URLSearchParams } from 'url';

const port = 8080;

const server = express();
server.set('trust proxy', 1);
server.set('query parser', (s: string | null) =>
  new URLSearchParams(s ?? ''));
server.use(express.text({ type: '*/*' }));
server.use((req, res, next) => {
  if (req.path.endsWith('/') && req.path !== '/')
    res.redirect(req.path.slice(0, -1));
  else
    next();
});
server.use(cookieSession({
  secret: 'use dotenv for this in real life',
  httpOnly: true,
}));

const chance = new Chance();
const markdown = new MarkdownIt();

const app = new imlib.App({
  db: new imlib.JsonFileDatabase('data.json'),
  server,
  generateId: () => chance.string({
    alpha: true,
    casing: 'lower',
    numeric: true,
    length: 7,
  }),
  sandbox: {
    console,
    JSON,
    escapeHtml,
    markdown,
    bcrypt,
  }
});

server.use(app.routeMiddleware);


app.start();
server.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
