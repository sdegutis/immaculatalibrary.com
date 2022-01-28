import { Routeable, RouteMethod } from "../core/router";
import { HashedStaticFile } from "../core/static";
import { EnrichedInput, notAllowedResponse } from "../pages/admin";
import { md } from "../util/helpers";
import { Content } from "../view/components/page";
import { Head, Html } from "../view/components/site";
import { Snippet, snippetRoutes } from "./snippet";
import { RouteOutput } from "/src/http";

export const adminCssPage = HashedStaticFile.fromFile(__dir.filesByName['admin.css']!);

export class CloneSnippetPage implements Routeable {

  update;
  constructor(private snippet: Snippet) {
    this.update = new UpdateSnippetPage(snippet);
    snippetRoutes.push(this.update);
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
          <body style='padding:0;margin:0;width:100vw;height:100vh;overflow:hidden;display:grid;grid-template-rows:minmax(0,1fr)'>
            <main style='margin:1em;display:grid;gap:1em;grid-template-columns:15fr 20fr 15fr 30fr'>
              <div style='display:grid;grid-template-rows:auto auto;overflow:auto;padding-right:1em'>
                <form method='POST' action={this.update.route} class='admin-form'>
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
              <div style='overflow:auto' id='editorarea'></div>
              <div style='overflow:auto;padding-right:1em'>
                <Content>
                  <div id='previewarea'></div>
                </Content>
              </div>
              <div style='overflow:auto'>
                <iframe style='width:100%;height:100%' src={this.snippet.archiveLink}></iframe>
              </div>
            </main>

            <link rel="stylesheet" data-name="vs/editor/editor.main" href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs/editor/editor.main.min.css" />
            <script>{`var require = { paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs' } }`}</script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs/loader.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs/editor/editor.main.nls.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs/editor/editor.main.js"></script>
            <script src="/js/new-book-snippet.js"></script>

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
