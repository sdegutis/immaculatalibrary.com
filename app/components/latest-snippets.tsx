import { SnippetsGroups } from "./snippet-groups";

export const LatestBookSnippets: JSX.Component<{}> = (attrs, children) => {
  return <>

    <h3>Latest book snippets</h3>
    <SnippetsGroups />

    <script defer>{`
      window.addEventListener('load', () => {
        showSnippetGroups((s, i) => i < 10);
      });
    `}</script>

  </>;
};
