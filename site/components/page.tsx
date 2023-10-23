import martel from '../fonts/martel/';
import { Font } from './fonts.js';
import { Meta } from './meta/meta.js';
import { QuickLinks } from './quicklinks/quicklinks.js';
import { SiteFooter } from './site-footer.js';
import { SiteHeader } from './site-header/site-header.js';

export const EmptyPage: JSX.Component = (attrs, children) => <>
  {'<!DOCTYPE html>'}
  <Font use={martel} fallback="serif">
    <html lang="en">

      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>Immaculata Library</title>
        <meta property="og:title" content='Immaculata Library' />
        <meta property="og:locale" content="en_US" />
        {/* {attrs.image && <meta property="og:image" content={`https://www.immaculatalibrary.com${attrs.image}`} />} */}
        <meta name="description" content="Catholic Digital Library" />

        <link rel="stylesheet" href='/css/base.css' />

        <Meta />
      </head>

      <body>
        {children}
      </body>

    </html>
  </Font>
</>;

export const TypicalPage: JSX.Component<{ title: string, image: string }> = (attrs, children) => <>
  <EmptyPage>

    <SiteHeader image={attrs.image} title={attrs.title} />

    <main>
      {children}
    </main>

    <QuickLinks />
    <SiteFooter />

  </EmptyPage>
</>;
