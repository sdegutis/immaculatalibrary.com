import { calculateReadingMins, formatDate, markdown } from "../../../core/helpers";
import { allSnippets } from "../../../model/models";

export default allSnippets.map(snippet => [`${snippet.slug}-preview.html`, <>
  <h4><a href={snippet.route}>{snippet.renderedTitle}</a></h4>
  <p>{formatDate(snippet.date)} &bull; {calculateReadingMins(snippet.content)} min</p>
  <p>
    From <a href={snippet.book.route}>{snippet.book.title}</a>
    , page <a rel="noopener" href={snippet.archiveLink}>{snippet.archivePage}</a>
    <br />
    <small>By {snippet.book.author}</small>
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