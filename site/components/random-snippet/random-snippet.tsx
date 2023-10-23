export const RandomBookSnippet: JSX.Component<{ link: (onclick: string) => JSX.Element }> = (attrs, children) => {
  return <>
    <script src='/components/random-snippet/randomsnippet.js' />
    {attrs.link(`goToRandomSnippet(event);`)}
  </>;
};
