import { addRouteable, Routeable, RouteMethod } from "../core/router";
import { HashedStaticFile } from "../core/static";
import { EnrichedInput, notAllowedResponse } from "../pages/admin";
import { md } from "../util/helpers";
import { Content } from "../view/components/page";
import { Head, Html } from "../view/components/site";
import { Snippet } from "./snippet";
import { RouteOutput } from "/src/http";

export const adminCssPage = HashedStaticFile.fromFile(__dir.filesByName['admin.css']!);
export const newBookSnippetScript = HashedStaticFile.fromFile(__dir.filesByName['new-book-snippet.js']!);

export class CloneSnippetPage implements Routeable {

  update;
  constructor(private snippet: Snippet) {
    this.update = new UpdateSnippetPage(snippet);
    addRouteable(this.update);
  }

  method: RouteMethod = 'GET';

  get route() {
    return `/admin/clone-book-snippet/${this.snippet.date}-${this.snippet.slug}`;
  }

  handle(input: EnrichedInput): RouteOutput {
    if (!input.session?.isAdmin) return notAllowedResponse(input);

    return {
      body: <>
        <Html>
          <Head>
            <link rel='stylesheet' href={adminCssPage.route} />
            <script
              src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.2.0/markdown-it.min.js"
              integrity="sha512-cTQeM/op796Fp1ZUxfech8gSMLT/HvrXMkRGdGZGQnbwuq/obG0UtcL04eByVa99qJik7WlnlQOr5/Fw5B36aw=="
              crossorigin="anonymous"
              referrerpolicy="no-referrer"></script>
          </Head>
          <body>
            <main>
              <div id='left-panel'>
                <form method='POST' action={this.update.route}>
                  <span>Link</span>    <input name='archiveLink' value={this.snippet.archiveLink} />
                  <span>Slug</span>    <input name='slug' />
                  <span>Title</span>   <input name='title' />
                  <span>Content</span> <textarea name='markdownContent' />
                  <span />
                  <button>Create</button>
                </form>
                <Content>
                  <h1>{this.snippet.title}</h1>
                  {md.render(this.snippet.markdownContent)}
                </Content>
              </div>
              <div id='editorarea'></div>
              <div style='padding-right:1em'>
                <Content>
                  <div id='previewarea'></div>
                </Content>
              </div>
              <div>
                <iframe src={this.snippet.archiveLink}></iframe>
              </div>
            </main>

            <link rel="stylesheet" data-name="vs/editor/editor.main" href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs/editor/editor.main.min.css" />
            <script>{`var require = { paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs' } }`}</script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs/loader.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs/editor/editor.main.nls.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs/editor/editor.main.js"></script>
            <script src={newBookSnippetScript.route}></script>

          </body>
        </Html>
      </>
    };
  }

}

export class UpdateSnippetPage implements Routeable {

  constructor(private snippet: Snippet) { }

  method: RouteMethod = 'POST';

  get route() {
    return `/admin/clone-book-snippet/${this.snippet.date}-${this.snippet.slug}`;
  }

  handle(input: EnrichedInput): RouteOutput {
    if (!input.session?.isAdmin) return notAllowedResponse(input);

    const params = new URLSearchParams(input.body.toString('utf8'));
    const newSnippet = this.snippet.createClone({
      archiveLink: params.get('archiveLink')!,
      slug: params.get('slug')!,
      title: params.get('title')!,
      markdownContent: params.get('markdownContent')!,
    });
    return {
      status: 302,
      headers: { 'Location': newSnippet.view.route },
    };
  }

}
