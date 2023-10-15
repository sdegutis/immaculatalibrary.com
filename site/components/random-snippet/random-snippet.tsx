import script from './randomsnippet.js';

export const RandomBookSnippet: JSX.Component<{ link: (onclick: string) => JSX.Element }> = (attrs, children) => {
  return <>
    <script src={script.path} />
    {attrs.link(`goToRandomSnippet(event);`)}
  </>;
};
