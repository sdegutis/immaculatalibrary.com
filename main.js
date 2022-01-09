const purity = require('@puritylib/purity');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const cookieSession = require('cookie-session');
const express = require('express');
const MarkdownIt = require('markdown-it');
const { URLSearchParams } = require('url');
const util = require('util');

dotenv.config();

const port = 8080;

const server = express();

server.set('trust proxy', 1);

server.set('query parser', (s) => new URLSearchParams(s ?? ''));

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

const db = new purity.JsonFileDatabase('data.json');

// const db = new purity.S3Database('imlibv3');
// db.saveRegularly();

const app = new purity.App(db, {
  util,
  JSON,
  console,
  markdown,
  bcrypt,
  Buffer,
});

server.use(app.routeMiddleware);

app.start().then(() => {

  server.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
  });

});
