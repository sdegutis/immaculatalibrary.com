import { aboutPage } from "../routes/about/about";
import { loginRoute, logoutRoute } from "../routes/admin/login";
import { audioBiblePage } from "../routes/audiobible/audiobible";
import { allBooksPage } from "../routes/books/all-books/all-books";
import { devotionsPage } from "../routes/devotions/devotions";
import { inlineFontCss } from "../routes/font/fonts";
import { mainSiteHeaderImagePath } from "../routes/home/home";
import { allMoviesPage } from "../routes/movies/all-movies/all-movies";
import { musicPage } from "../routes/music/music";
import { staticRouteFor } from "../util/static";
import { DarkModeButton, darkModeScript } from "./dark-mode/button";
import { HeroImage } from "./hero-image/hero-image";
import { Meta } from "./meta/meta";
import { QuickLinks } from "./quicklinks";
import { SiteHeader } from "./site-header/site-header";

export const Html: JSX.Component<{}> = (attrs, children) => <>
  {'<!DOCTYPE html>'}
  <html lang="en">
    {children}
  </html>
</>

export const Head: JSX.Component<{ imagePath?: string, title?: string, description?: string | undefined }> = (attrs, children) => <>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>{attrs.title && `${attrs.title} - `}Immaculata Library</title>
    <meta property="og:title" content={'Immaculata Library' + (attrs.title ? `: ${attrs.title}` : '')} />
    <meta property="og:locale" content="en_US" />
    <meta property="og:image" content={`https://www.immaculatalibrary.com${attrs.imagePath ?? mainSiteHeaderImagePath}`} />
    <meta name="description" content={attrs.description ?? "Free Digital Catholic Books"} />

    <script src={darkModeScript}></script>
    <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['site.css']!)} />

    <style>{inlineFontCss}</style>

    <Meta />

    {children}
  </head>
</>;

export { SiteHeader };

export const SiteFooter: JSX.Component<{ input: RouteInput }> = (attrs, children) => <>
  <footer id='site-footer'>
    <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['site-footer.css']!)} />
    <div class='sitewide-quicklinks'>
      <a href={aboutPage.route}>About</a>
      <a href={allBooksPage.route}>Books</a>
      <a href={allMoviesPage.route}>Movies</a>
      <a href={musicPage.route}>Music</a>
      <a href={audioBiblePage.route}>Audio Bible</a>
      <a href={devotionsPage.route}>Devotions</a>
    </div>
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

export const SiteCommon: JSX.Component<{
  input: RouteInput,
  title: string,
  image: string,
  description?: string,
}> = (attrs, children) => <>
  <Html>
    <Head title={attrs.title} description={attrs.description} />
    <body>
      <SiteHeader />
      <main>
        <HeroImage image={attrs.image} />
        {children}
      </main>
      <QuickLinks />
      <SiteFooter input={attrs.input} />
    </body>
  </Html>
</>;
