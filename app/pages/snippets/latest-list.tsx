import { publishedSnippets } from "../../model/models";
import { groupByDate, md, reading_mins } from "../../util/helpers";

const latestBookSnippetsStyle = `
ul.snippets-latest {
  padding-left: 0;
}

ul.snippets-latest > li {
  list-style-type: none;
}

ul.snippets-latest > li ul {
  padding-left: 20px;
}

ul.snippets-latest > li li {
  list-style-type: disc;
}
`;

export const LatestBookSnippets: Component<{}> = (attrs, children) => {
  const recentBookSnippets = publishedSnippets.slice(0, 9);
  const groups = Object.entries(groupByDate(recentBookSnippets));

  return <>
    <style>{latestBookSnippetsStyle}</style>

    <h3>Latest book snippets</h3>
    <p>
      <a href="/book-snippets.html">See all {publishedSnippets.length}</a>
      {' | '}
      <a href='/random-book-snippet.html'>Random Book Snippet</a>
    </p>
    <ul class="snippets-latest">
      {groups.map(([date, group]) => <>
        <li>
          <h4>{date}</h4>
          <ul>
            {group.map(snippet => <>
              <li>
                <p>
                  <a href={snippet.view.route}>{md.renderInline(snippet.title)}</a>
                  <br /> {reading_mins(snippet.markdownContent)} min &mdash; {snippet.book.title}
                </p>
              </li>
            </>)}
          </ul>
        </li>
      </>)}
    </ul>

  </>;
};
