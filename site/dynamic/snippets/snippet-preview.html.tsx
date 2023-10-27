import { formatDate, markdown } from "../../core/helpers.js";
import { allSnippets } from "../../model/snippets.js";

export default allSnippets.map(snippet => [`${snippet.slug}-preview.html`, <>
  <h4><a href={snippet.route}>{snippet.renderedTitle}</a></h4>
  <p>{formatDate(snippet.date)} &bull; {snippet.mins} min</p>
  <p>
    From <a href={snippet.book.route}>{snippet.book.data.title}</a>
    , page <a rel="noopener" target='_blank' href={snippet.archiveLink}>{snippet.data.archivePage}</a>
    <br />
    <small>By {snippet.book.data.author}</small>
  </p>
  <div class='rendered-preview'>
    {snippet.previewMarkdown
      ? <>
        <div>{markdown.render(snippet.previewMarkdown)}</div>
        <div hidden>{snippet.renderedBody}</div>
        <a href='#' class='continue-reading-snippet-link'><i>Continue reading...</i></a>
      </>
      : snippet.renderedBody}
  </div>
</>]);
