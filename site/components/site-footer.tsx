const currentYearScript = <script>{`document.write(new Date().getFullYear())`}</script>;

export const SiteFooter: JSX.Component = (attrs, children) => <>
  <footer id='site-footer'>
    <link rel="stylesheet" href='/css/components/site-footer.css' />
    <p><span>2020-{currentYearScript} <a href="mailto:sbdegutis@gmail.com">Steven Degutis</a> &copy; All Rights Reserved</span></p>
  </footer>
</>;
