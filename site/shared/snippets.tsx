import { SnippetSmallerJson } from "../dynamic/snippets/snippet.js";

export const SnippetsList: JSX.Component<{ snippets: SnippetSmallerJson[] }> = (attrs, children) => <>
  <ul style='padding-left: 20px'>
    {attrs.snippets.map(s => <>
      <SnippetItem snippet={s} />
    </>)}
  </ul>
</>;

export const SnippetItem: JSX.Component<{ snippet: SnippetSmallerJson }> = ({ snippet }, children) => <>
  <li data-slug={snippet.slug}>
    <p>
      <a href={snippet.route}>{snippet.renderedTitle}</a>
      <br />
      {snippet.mins} min &mdash; {snippet.book.data.title}
    </p>
  </li>
</>;
