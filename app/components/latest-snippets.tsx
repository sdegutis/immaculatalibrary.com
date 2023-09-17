// import { calculateReadingMins, groupByDate } from "../core/helpers";
// import { allSnippets } from "../model/models";
// import { Snippet } from "../model/snippets";

// export const SnippetsGroups: JSX.Component<{ groups: [string, Snippet[]][] }> = ({ groups }, children) => <>
//   <style>{`
//     ul.snippets-latest {
//       padding-left: 0;
//     }

//     ul.snippets-latest > li {
//       list-style-type: none;
//     }

//     ul.snippets-latest > li ul {
//       padding-left: 20px;
//     }

//     ul.snippets-latest > li li {
//       list-style-type: disc;
//     }
//   `}</style>
//   <ul class="snippets-latest">
//     {groups.map(([date, group]) => <>
//       <li>
//         <h4>{date}</h4>
//         <ul>
//           {group.map(snippet => <>
//             <li>
//               <p>
//                 <a href={snippet.route}>{snippet.renderedTitle}</a>
//                 <br /> {calculateReadingMins(snippet.content)} min &mdash; {snippet.book.title}
//               </p>
//             </li>
//           </>)}
//         </ul>
//       </li>
//     </>)}
//   </ul>
// </>;

// const totalReadingMins = calculateReadingMins(allSnippets.map(s => s.content).join('\n\n'));
// const mins = Math.round(totalReadingMins % 60);
// const hours = Math.floor(totalReadingMins / 60);
// const totalReadingTime = `${hours}h ${mins}m`;

// const recentBookSnippets = allSnippets.slice(0, 9);
// const groups = Object.entries(groupByDate(recentBookSnippets));

export const LatestBookSnippets: JSX.Component<{}> = (attrs, children) => {
  return <>

    <h3>Latest book snippets</h3>
    {/* <p>
      <a href='/snippets.html'>Search</a> | { }
      <a href='#'>Random</a> | { }
      {allSnippets.length} total | { }
      {totalReadingTime}
    </p>

    <SnippetsGroups groups={groups} /> */}

  </>;
};
