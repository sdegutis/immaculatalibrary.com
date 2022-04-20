import { loginRoute, logoutRoute } from "../routes/admin/login";
import { inlineFontCss } from "../routes/font/fonts";
import { mainSiteHeaderImagePath } from "../routes/home/home";
import { staticRouteFor } from "../util/static";
import { DarkModeButton } from "./dark-mode/button";
import { HeroImage } from "./hero-image/hero-image";
import { Meta } from "./meta/meta";
import { Navlinks } from "./navlinks";
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
    <p>
      <span>{new Date().getFullYear()} ImmaculataLibrary.com &copy; All Rights Reserved</span>
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
      <main>
        <HeroImage image={attrs.image}>
          <SiteHeader />
        </HeroImage>
        <Navlinks />
        {children}
      </main>
      <QuickLinks />
      <SiteFooter input={attrs.input} />
    </body>
  </Html>
</>;
