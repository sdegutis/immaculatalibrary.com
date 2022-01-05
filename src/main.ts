import basicAuth from 'basic-auth';
import bcrypt from 'bcryptjs';
import cookieSession from 'cookie-session';
import 'dotenv/config';
import escapeHtml from 'escape-html';
import express from 'express';
import MarkdownIt from 'markdown-it';
import 'source-map-support/register';
import { URLSearchParams } from 'url';
import util from 'util';
import * as imlib from './imlib';

const port = 8080;

const server = express();

server.set('trust proxy', 1);

server.set('query parser', (s: string | null) => new URLSearchParams(s ?? ''));

server.use(express.text({ type: '*/*', limit: '100mb' }));

server.use((req, res, next) => {
  if (req.path.endsWith('/') && req.path !== '/')
    res.redirect(req.path.slice(0, -1));
  else
    next();
});

server.use(cookieSession({
  secret: process.env['COOKIE_SECRET'],
  httpOnly: true,
}));

const markdown = new MarkdownIt({
  html: true,
  typographer: true,
  linkify: true,
  breaks: true,
});

// const db = new imlib.JsonDirDatabase('data');

const db = new imlib.S3Database('imlibv3');
db.saveRegularly();

const app = new imlib.App({
  db,
  sandbox: {
    util,
    JSON,
    escapeHtml,
    markdown,
    bcrypt,
    Buffer,
    basicAuth,
  }
});

server.use(app.routeMiddleware);

app.start().then(() => {

  server.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
  });

});
