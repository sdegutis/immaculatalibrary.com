export const RandomBookSnippet: JSX.Component<{ link: (onclick: string) => JSX.Element }> = (attrs, children) => {
  return <>
    <script src='/script/randomsnippet.js' />
    {attrs.link(`goToRandomSnippet(event);`)}
  </>;
};
