import { DarkModeButton } from "./dark-mode.js";

export const SiteFooter: JSX.Component = (attrs, children) => <>
  <footer id='site-footer'>
    <link rel="stylesheet" href='/css/components/site-footer.css' />
    <p>
      <span>2020-{new Date().getFullYear()} Steven Degutis &copy; All Rights Reserved</span>
      <> &bull; </>
      <a href="mailto:sbdegutis@gmail.com">Contact</a>
      <> &bull; </>
      <DarkModeButton />
    </p>
  </footer>
</>;
