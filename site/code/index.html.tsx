import { Font } from '../components/fonts.js';
import martel from '../fonts/martel/';

export default <>
  <Html>
    <h1>Front-end framework that runs Immaculata Library</h1>
    <p>I wrote this to solve a few problems for myself:</p>
    <ul>
      <li>Performance:
        <ul>
          <li>Transform 1300+ Markdown files quickly</li>
          <li>Build the whole site in ~900ms</li>
          <li>Rebuild single pages in ~90ms</li>
          <li>Avoid the slowness of SSG-side tools</li>
          <li>Not be tied to any browser-side frameworks</li>
        </ul>
      </li>
      <li>Code:
        <ul>
          <li>Use JSX as the view/templating language SSG-side</li>
          <li>Use the DOM directly browser-side</li>
          <li>Have the entire SSG be a simple TypeScript app</li>
          <li>Import data files via TypeScript <code>import</code> statements</li>
        </ul>
      </li>
      <li>JSX:
        <ul>
          <li>Render JSX in both SSG and browser for SEO</li>
          <li>Make JSX browser-side transform to <code>document.createElement</code></li>
          <li>Make JSX SSG-side transform to plain strings</li>
          <li>Have shared JSX-producing functions for SSG and browser side</li>
        </ul>
      </li>
    </ul>
  </Html>
</>;

function Html(attrs: any, children: any) {
  return <>
    {'<!DOCTYPE html>'}
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>imlib</title>
        <link href='./style.css' rel='stylesheet' />
        <script src='./client.js' type='module' />
      </head>
      <body>
        <Font use={martel} fallback="serif">
          {children}
        </Font>
      </body>
    </html>
  </>;
}
