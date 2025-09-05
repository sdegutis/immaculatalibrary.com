import { LoadingLine, LoadingParagraph } from "./$loading.js"

export const LatestSnippetsArea = () => <>
  <div id='latest-book-snippets-area'>
    <p>
      <LoadingLine width="24em" />
    </p>
    <ul>
      <li><LoadingParagraph lines={3} /></li>
      <li><LoadingParagraph lines={4} /></li>
      <li><LoadingParagraph lines={3} /></li>
      <li><LoadingParagraph lines={3} /></li>
      <li><LoadingParagraph lines={4} /></li>
      <li><LoadingParagraph lines={3} /></li>
      <li><LoadingParagraph lines={3} /></li>
    </ul>
  </div>
  <script type='module' src='/scripts/latest-book-snippets.js' />
</>
