import { calculateReadingMins } from "../core/helpers";
import { Snippet } from "../model/snippets";

export const SnippetsGroups: JSX.Component<{ groups: [string, Snippet[]][] }> = ({ groups }, children) => <>
  <link rel='stylesheet' href='/css/snippet-groups.css' />
  {/* <script src='/script/snippet-groups.js' /> */}
  <ul class="snippets-latest">
    {groups.map(([date, group]) => <>
      <li>
        <h4>{date}</h4>
        <ul>
          {group.map(snippet => <>
            <li>
              <p>
                <a href={snippet.route}>{snippet.renderedTitle}</a>
                <br /> {calculateReadingMins(snippet.content)} min &mdash; {snippet.book.title}
              </p>
            </li>
          </>)}
        </ul>
      </li>
    </>)}
  </ul>
</>;
