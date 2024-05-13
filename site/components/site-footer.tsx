const currentYearScript = <script>{`document.write(new Date().getFullYear())`}</script>;

export const SiteFooter: JSX.Component<{ thin?: boolean }> = (attrs, children) => <>
  <footer id='site-footer' class={attrs.thin ? 'thin' : ''}>
    <link rel="stylesheet" href='/css/components/site-footer.css' />
    <p><span>2020-{currentYearScript} &copy; All Rights Reserved</span></p>
  </footer>
</>;
