import martel from '../fonts/martel/';
import { Font } from './fonts.js';
import { Meta } from './meta.js';
import { NavPage } from './navlinks.js';
import { QuickLinks } from './quicklinks.js';
import { SiteFooter } from './site-footer.js';
import { SiteHeader } from './site-header.js';

export const EmptyPage: JSX.Component<{ favicons?: JSX.Element }> = (attrs, children) => <>
  {'<!DOCTYPE html>'}
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

      <Meta {...attrs} />
    </head>

    <body>
      <Font use={martel} fallback="serif">
        {children}
      </Font>
    </body>

  </html>
</>;

export const TypicalPage: JSX.Component<{ title: string, image: string, page: NavPage }> = (attrs, children) => <>
  <EmptyPage>

    <SiteHeader page={attrs.page} image={attrs.image} title={attrs.title} />

    <main>
      {children}
    </main>

    <QuickLinks />
    <SiteFooter />

  </EmptyPage>
</>;
