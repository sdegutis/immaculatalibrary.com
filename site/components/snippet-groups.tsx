import { Snippet } from "../model/snippets.js";

export const SnippetsGroups: JSX.Component<{ snippets: Snippet[] }> = ({ snippets }, children) => <>
  <ul style='padding-left: 20px'>
    {snippets.map(snippet => <>
      <li data-slug={snippet.slug}>
        <p>
          <a href={snippet.route}>{snippet.renderedTitle}</a>
          <br />
          {snippet.mins} min &mdash; {snippet.book.data.title}
        </p>
      </li>
    </>)}
  </ul>
</>;
