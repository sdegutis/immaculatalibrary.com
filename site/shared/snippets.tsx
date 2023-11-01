type SnippetUiInfo = {
  route: string;
  renderedTitle: string;
  mins: number;
  book: { data: { title: string } };
};

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
      <a href={snippet.route}>{snippet.renderedTitle}</a>
      <br />
      {snippet.mins} min &bull; {snippet.book.data.title}
    </p>
  </li>
);
