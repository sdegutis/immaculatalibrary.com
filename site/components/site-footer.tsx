const CurrentYear = () => <script>{`document.write(new Date().getFullYear())`}</script>;
const Copyright = () => <>2020-<CurrentYear /> &copy; All Rights Reserved</>;
const Email = () => <a href='mailto:sbdegutis@gmail.com'>Email</a>;
const Source = () => <a href='https://github.com/sdegutis/immaculatalibrary.com'>Source code</a>;

export const SiteFooter: JSX.Component<{ thin?: boolean }> = (attrs, children) => <>
  <footer id='site-footer' class={attrs.thin ? 'thin' : ''}>
    <link rel="stylesheet" href='/css/components/site-footer.css' />
    <p><span><Copyright /> &bullet; <Email /> &bullet; <Source /></span></p>
  </footer>
</>;
