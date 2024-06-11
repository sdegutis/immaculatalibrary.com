import { EmptyPage } from "../../components/page.js";
import { Typography } from "../../components/typography.js";
import { handlers } from "../../core/handlers.js";
import { FatherQuote } from "../../model/fatherquotes.js";
import { Quote } from "./document-client.js";

handlers.set(__filename, body => {
  const params = new URLSearchParams(body);
  const quotes = JSON.parse(params.get('markdownContent')!) as Quote[];

  for (const quote of quotes) {
    const file = new FatherQuote(`${quote.book}-${quote.chapter}-${quote.verse}`, quote.commentaryQuotes, {
      gospelQuote: quote.gospelQuote,
    });
    file.save();
  }

  return '/';
});

export default <>
  <EmptyPage>
    <link rel='stylesheet' href='./document.css' />
    <script src='./document-client.js' type='module'></script>

    <main>
      <form id='left-panel' method='POST' action={__filename}>
        <textarea name='markdownContent' />
        <button>Create</button>
      </form>
      <div id='editorarea'></div>
      <div style='padding-right:1em'>
        <Typography>
          <div id='previewarea'></div>
        </Typography>
      </div>
      <div style='overflow:hidden'>
        <iframe />
      </div>
    </main>

  </EmptyPage>

</>;
