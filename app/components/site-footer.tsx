import { DarkModeButton } from "./darkmode/dark-mode";

export const SiteFooter: JSX.Component<{}> = (attrs, children) => <>
  <footer id='site-footer'>
    <link rel="stylesheet" href='/css/site-footer.css' />
    <p>
      <span>{new Date().getFullYear()} ImmaculataLibrary.com &copy; All Rights Reserved</span>
      {' | '}
      <a href="mailto:immaculatalibrary@gmail.com">Contact</a>
      {' | '}
      <DarkModeButton />
    </p>
  </footer>
  <script>
    {`for (const link of document.querySelectorAll('a[href^="https://archive.org/details/"]')) {
        link.target = '_blank';
      }`}
  </script>
</>;
