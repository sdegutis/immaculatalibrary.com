import { EmptyPage } from "../../components/page.js";
import { Typography } from "../../components/typography.js";
import { handlers } from "../../core/handlers.js";

handlers.set(__filename, body => {
  const params = new URLSearchParams(body);
  const json = JSON.parse(params.get('markdownContent')!);

  console.log(json);

  // const date = new Date().toLocaleDateString('sv');
  // const slug = `${date}-${params.get('slug')!}`;

  // const snippet = new Snippet(slug, params.get('markdownContent')!, {
  //   published: true,
  //   title: params.get('title')!,
  //   archivePage: params.get('archivePage')!,
  //   archiveSlug: params.get('archiveSlug')!,
  //   bookSlug: params.get('bookSlug')!,
  //   tags: params.getAll('tags').filter(t => t),
  // });

  // snippet.save();

  // return snippet.route;

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
