// import { calculateReadingMins, groupByDate } from "../core/helpers";
// import { allSnippets } from "../model/models";
// import { Snippet } from "../model/snippets";

import { SnippetsGroups } from "./snippet-groups";

// const totalReadingMins = calculateReadingMins(allSnippets.map(s => s.content).join('\n\n'));
// const mins = Math.round(totalReadingMins % 60);
// const hours = Math.floor(totalReadingMins / 60);
// const totalReadingTime = `${hours}h ${mins}m`;

// const recentBookSnippets = allSnippets.slice(0, 9);
// const groups = Object.entries(groupByDate(recentBookSnippets));

export const LatestBookSnippets: JSX.Component<{}> = (attrs, children) => {
  return <>

    <h3>Latest book snippets</h3>
    <SnippetsGroups />

    <script defer>{`
      window.addEventListener('load', () => {
        showSnippetGroups((s, i) => i < 10);
      });
    `}</script>

    {/* <p>
      <a href='/snippets.html'>Search</a> | { }
      <a href='#'>Random</a> | { }
      {allSnippets.length} total | { }
      {totalReadingTime}
    </p>

    <SnippetsGroups groups={groups} /> */}

  </>;
};
