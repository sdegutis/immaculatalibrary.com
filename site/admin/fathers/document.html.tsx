import { EmptyPage } from "../../components/page.js";
import { Typography } from "../../components/typography.js";

export default <>
  <EmptyPage>
    <link rel='stylesheet' href='./document.css' />
    <script src='./document-client.js' type='module'></script>

    <main>
      <form id='left-panel' method='POST' action='/document-father-quote'>
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
