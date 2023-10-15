import { calculateReadingMins } from "../core/helpers";
import { allSnippets } from "../model/snippets";

const totalReadingMins = calculateReadingMins(allSnippets.map(s => s.content).join('\n\n'));
const mins = Math.round(totalReadingMins % 60);
const hours = Math.floor(totalReadingMins / 60);
const totalReadingTime = `${hours}h ${mins}m`;

export const SnippetsGroups: JSX.Component = (attrs, children) => <>
  <link rel='stylesheet' href='/css/snippet-groups.css' />
  <script type='module' src='/script/snippet-groups.js' />

  <p>
    <a href='/snippets.html'>Search</a> | { }
    <a href='#' class='get-random-book-snippet'>Random</a> | { }
    {allSnippets.length} total | { }
    {totalReadingTime}
  </p>


  <div id='snippets-group-area'>
    <p><em>Loading...</em></p>
  </div>
</>;
