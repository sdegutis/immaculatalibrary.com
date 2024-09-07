export const FadeIn = (attrs: { children: any }) => <>
  <div class='fadein' style='opacity: 0; transform: translateY(2em)'>
    <script type='module' src='/scripts/fadein.js' />
    {attrs.children}
  </div>
</>;
