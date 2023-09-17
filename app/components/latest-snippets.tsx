import { SnippetsGroups } from "./snippet-groups";

export const LatestBookSnippets: JSX.Component<{}> = (attrs, children) => {
  return <>

    <h3>Latest book snippets</h3>
    <SnippetsGroups />

    <script type='module'>{`
      import { showSnippetGroups } from '/script/snippet-groups.js';
      showSnippetGroups((s, i) => i < 10);
    `}</script>

  </>;
};
