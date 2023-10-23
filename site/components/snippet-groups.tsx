import { calculateReadingMins } from "../core/helpers.js";
import { allSnippets, Snippet } from "../model/snippets.js";
import { formatDate } from "./format-date.js";
import { RandomBookSnippet } from "./random-snippet/random-snippet.js";
import { WordSep } from "./word-sep.js";

const totalReadingMins = calculateReadingMins(allSnippets.map(s => s.content).join('\n\n'));
const mins = Math.round(totalReadingMins % 60);
const hours = Math.floor(totalReadingMins / 60);
const totalReadingTime = `${hours}h ${mins}m`;

export const SnippetsGroups: JSX.Component<{ snippets: Snippet[] }> = (attrs, children) => {
  const groups = Object.entries(groupByDate(attrs.snippets));

  return <>
    <link rel='stylesheet' href='/css/snippet-groups.css' />

    <p>
      <a href='/snippets.html'>Search</a>
      <WordSep />
      <RandomBookSnippet link={onclick =>
        <a href='#' onclick={onclick}>Random</a>
      } />
      <WordSep />
      {allSnippets.length} total
      <WordSep />
      {totalReadingTime}
    </p>

    <ul class="snippets-latest">
      {groups.map(([date, group]) => <>
        <li>
          <h4>{formatDate(date)}</h4>
          <ul>
            {group.map(snippet => <>
              <li data-slug={snippet.slug}>
                <p>
                  <a href={snippet.route}>{snippet.renderedTitle}</a>
                  <br />
                  {snippet.mins} min &mdash; {snippet.book.data.title}
                </p>
              </li>
            </>)}
          </ul>
        </li>
      </>)}
    </ul>
  </>;
};

function groupByDate<T extends { date: string }>(array: T[]) {
  const groups: Record<string, T[]> = Object.create(null);
  for (const o of array) {
    const d = o.date;
    if (!groups[d]) groups[d] = [];
    groups[d]!.push(o);
  }
  return groups;
}
