import { calculateReadingMins } from "../core/helpers.js";
import { allSnippets, Snippet } from "../model/snippets.js";
import { RandomBookSnippet } from "./random-snippet.js";
import { WordSep } from "./word-sep.js";

const totalReadingMins = calculateReadingMins(allSnippets.map(s => s.content).join('\n\n'));
const mins = Math.round(totalReadingMins % 60);
const hours = Math.floor(totalReadingMins / 60);
const totalReadingTime = `${hours}h ${mins}m`;

export const SnippetsGroups: JSX.Component<{ snippets: Snippet[] }> = ({ snippets }, children) => <>
  <link rel='stylesheet' href='/css/components/snippet-groups.css' />

  <p>
    <a href='/snippets.html'>Search</a>
    <WordSep />
    <RandomBookSnippet>
      <a href='#'>Random</a>
    </RandomBookSnippet>
    <WordSep />
    {allSnippets.length} total
    <WordSep />
    {totalReadingTime}
  </p>

  <ul class="snippets-latest">
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
