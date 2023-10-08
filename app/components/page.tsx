import { Navlinks } from "./navlinks";
import { QuickLinks } from "./quicklinks";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export const EmptyPage: JSX.Component = (attrs, children) => <>
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
      <link rel="stylesheet" href='/css/fonts.css' />

      <link rel="apple-touch-icon" sizes="180x180" href="/meta/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/meta/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/meta/favicon-16x16.png" />
      <link rel="manifest" href='/meta/site.webmanifest' />
    </head>

    <body>
      {children}
    </body>

  </html>
</>;

export const TypicalPage: JSX.Component<{ image: string }> = (attrs, children) => <>
  <EmptyPage>

    <SiteHeader image={attrs.image} />
    <Navlinks />

    <main>
      {children}
    </main>

    <QuickLinks />
    <SiteFooter />

  </EmptyPage>
</>;
