export const RandomBookSnippet: JSX.Component<{}, [JSX.Element]> = (attrs, [child]) => {
  const childAttrs: Record<string, any> = child.attrs ?? Object.create(null);
  if (!child.attrs) child.attrs = childAttrs;

  let id = childAttrs["id"];
  if (!id) childAttrs["id"] = id = 'random-book-snippet-button';

  return <>
    {child}
    <script type='module' src='/scripts/randomsnippet.js' />
    <script type='module'>{`
      import {goToRandomSnippet} from '/scripts/randomsnippet.js';
      document.getElementById("${id}").onclick = goToRandomSnippet;
    `}</script>
  </>;
};
