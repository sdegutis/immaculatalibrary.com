import { DarkModeButton } from "./darkmode/dark-mode";
import { WordSep } from "./word-sep";

export const SiteFooter: JSX.Component = (attrs, children) => <>
  <footer id='site-footer'>
    <link rel="stylesheet" href='/css/site-footer.css' />
    <p>
      <span>{new Date().getFullYear()} ImmaculataLibrary.com &copy; All Rights Reserved</span>
      <WordSep />
      <a href="mailto:immaculatalibrary@gmail.com">Contact</a>
      <WordSep />
      <DarkModeButton />
    </p>
  </footer>
</>;
