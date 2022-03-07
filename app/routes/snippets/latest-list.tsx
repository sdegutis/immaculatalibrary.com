import { snippetEvents } from "../../model/events";
import { allSnippets } from "../../model/models";
import { Snippet } from "../../model/snippets/snippet";
import { calculateReadingMins, groupByDate, markdown } from "../../util/helpers";
import { allSnippetsPage } from "./all/snippets";
import { randomSnippetPage } from "./random";

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

export const SnippetsGroups: JSX.Component<{ groups: [string, Snippet[]][] }> = ({ groups }, children) => <>
  <style>{latestBookSnippetsStyle}</style>
  <ul class="snippets-latest">
    {groups.map(([date, group]) => <>
      <li>
        <h4>{date}</h4>
        <ul>
          {group.map(snippet => <>
            <li>
              <p>
                <a href={snippet.view.route}>{markdown.renderInline(snippet.title)}</a>
                <br /> {calculateReadingMins(snippet.markdownContent)} min &mdash; {snippet.book.title}
              </p>
            </li>
          </>)}
        </ul>
      </li>
    </>)}
  </ul>
</>;

let totalReadingTime = <></>;
function updateTotalReadingTime() {
  const totalReadingMins = calculateReadingMins(allSnippets.map(s => s.markdownContent).join('\n\n'));
  const mins = Math.round(totalReadingMins % 60);
  const hours = Math.floor(totalReadingMins / 60);
  totalReadingTime = <>
    <b>{hours}</b>h <b>{mins}</b>m
  </>;
}

snippetEvents.on('created', updateTotalReadingTime);
snippetEvents.on('updated', updateTotalReadingTime);

setTimeout(updateTotalReadingTime, 0);

export const LatestBookSnippets: JSX.Component<{}> = (attrs, children) => {
  const recentBookSnippets = allSnippets.slice(0, 9);
  const groups = Object.entries(groupByDate(recentBookSnippets));

  return <>

    <h3>Latest book snippets</h3>
    <p>(Total book snippets reading time: {totalReadingTime})</p>
    <p>
      <a href={allSnippetsPage.route}>See all {allSnippets.length}</a>
      {' | '}
      <a href={randomSnippetPage.route}>Random Book Snippet</a>
    </p>

    <SnippetsGroups groups={groups} />

  </>;
};