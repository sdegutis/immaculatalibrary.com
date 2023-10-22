import { DarkModeButton } from "./darkmode/dark-mode";

export const SiteFooter: JSX.Component = (attrs, children) => <>
  <footer id='site-footer'>
    <link rel="stylesheet" href='/css/site-footer.css' />
    <p>
      <span>{new Date().getFullYear()} ImmaculataLibrary.com &copy; All Rights Reserved</span> &bullet; { }
      <a href="mailto:immaculatalibrary@gmail.com">Contact</a> &bullet; { }
      <DarkModeButton />
    </p>
  </footer>
</>;
