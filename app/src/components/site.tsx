import { EnrichedInput, loginRoute, logoutRoute } from "../auth/login";
import { mainSiteHeaderImagePath } from "../pages/home/home";
import { DarkModeButton, darkModeScript } from "./dark-mode/button";
import { Meta } from "./meta/meta";
import { SiteHeader } from "./site-header/site-header";
import { fontsCssRoute } from "/src/font/fonts";

export const Html: Component<{}> = (attrs, children) => <>
  {'<!DOCTYPE html>'}
  <html lang="en">
    {children}
  </html>
</>

export const Head: Component<{ imagePath?: string, title?: string, description?: string }> = (attrs, children) => <>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>{attrs.title && `${attrs.title} - `}Immaculata Library</title>
    <meta property="og:title" content={'Immaculata Library' + (attrs.title ? `: ${attrs.title}` : '')} />
    <meta property="og:locale" content="en_US" />
    <meta property="og:image" content={`https://www.immaculatalibrary.com${attrs.imagePath ?? mainSiteHeaderImagePath}`} />
    <meta name="description" content={attrs.description ?? "Free Digital Catholic Books"} />

    <script src={darkModeScript}></script>
    <link rel="stylesheet" href="/css/base/base.css" />
    <link rel="stylesheet" href={fontsCssRoute} />

    <Meta />

    {children}
  </head>
</>;

export { SiteHeader };

export const SiteFooter: Component<{ input: EnrichedInput }> = (attrs, children) => <>
  <footer style='color:#999; text-align:center; margin:3em 1em'>
    <p>
      {new Date().getFullYear()} ImmaculataLibrary.com &copy; All Rights Reserved
      {' | '}
      <a href="mailto:immaculatalibrary@gmail.com">Contact</a>
      {' | '}
      <DarkModeButton />
      {' | '}
      {attrs.input.session?.isAdmin ? <>
        <a href={logoutRoute.route}>Logout</a>
      </> : <>
        <a href={loginRoute.route}>Login</a>
      </>}
    </p>
  </footer>
  <script>
    {`for (const link of document.querySelectorAll('a[href^="https://archive.org/details/"]')) {
        link.target = '_blank';
      }`}
  </script>
</>;
