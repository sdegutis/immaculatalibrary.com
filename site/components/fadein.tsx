export const FadeIn: JSX.Component<{ children: any }> = (attrs) => <>
  <div class='fadein' style='opacity: 0; transform: translateY(2em)'>
    <script type='module' src='/scripts/fadein.js' />
    {attrs.children}
  </div>
</>;
