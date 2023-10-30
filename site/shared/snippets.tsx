import { SnippetSmallerJson } from "../dynamic/snippets/snippet.js";

export const SnippetsList: JSX.Component<{ snippets: SnippetSmallerJson[] }> = (attrs, children) => <>
  <ul>
    {attrs.snippets.map(s => <>
      <SnippetItem snippet={s} />
    </>)}
  </ul>
</>;

export const SnippetItem: JSX.Component<{ snippet: SnippetSmallerJson }> = ({ snippet }, children) => (
  <li>
    <p>
      <a href={snippet.route}>{snippet.renderedTitle}</a>
      <br />
      {snippet.mins} min &bull; {snippet.book.data.title}
    </p>
  </li>
);
