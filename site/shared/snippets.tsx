export const SnippetItem: JSX.Component<{
  snippet: {
    route: string;
    title: string;
    mins: number;
    bookTitle: string;
  }
}> = ({ snippet }, children) => (
  <li>
    <p>
      <a href={snippet.route}>{snippet.title}</a>
      <br />
      {snippet.mins} min &bull; {snippet.bookTitle}
    </p>
  </li>
);
