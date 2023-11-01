import { Snippet } from "../model/snippets.js";

type SnippetUiInfo = {
  route: string;
  title: string;
  mins: number;
  bookTitle: string;
};

export function snippetToViewable(snippet: Snippet): SnippetUiInfo {
  return {
    route: snippet.route,
    title: snippet.renderedTitle,
    mins: snippet.mins,
    bookTitle: snippet.book.data.title,
  };
}

export const SnippetsList: JSX.Component<{ snippets: SnippetUiInfo[] }> = (attrs, children) => <>
  <ul>
    {attrs.snippets.map(s => <>
      <SnippetItem snippet={s} />
    </>)}
  </ul>
</>;

export const SnippetItem: JSX.Component<{ snippet: SnippetUiInfo }> = ({ snippet }, children) => (
  <li>
    <p>
      <a href={snippet.route}>{snippet.title}</a>
      <br />
      {snippet.mins} min &bull; {snippet.bookTitle}
    </p>
  </li>
);
