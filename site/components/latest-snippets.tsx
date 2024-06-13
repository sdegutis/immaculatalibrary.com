import { LoadingLine, LoadingParagraph } from "../shared/loading.js";

export function LatestSnippetsArea() {
  return <>
    <div id='latest-book-snippets-area'>
      <LoadingLine width="14em" />
      <ul>
        <li><LoadingParagraph lines={2} /></li>
        <li><LoadingParagraph lines={2} /></li>
        <li><LoadingParagraph lines={2} /></li>
        <li><LoadingParagraph lines={2} /></li>
        <li><LoadingParagraph lines={2} /></li>
        <li><LoadingParagraph lines={2} /></li>
        <li><LoadingParagraph lines={2} /></li>
      </ul>
    </div>
    <script type='module' src='/scripts/latest-book-snippets.js' />
  </>;
}
