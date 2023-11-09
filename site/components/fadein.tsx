export const FadeIn: JSX.Component = (attrs, children) => <>
  <div class='fadein'>
    <link rel='stylesheet' href='/css/components/fadein.css' />
    <script type='module' src='/scripts/fadein.js' />
    {children}
  </div>
</>;
