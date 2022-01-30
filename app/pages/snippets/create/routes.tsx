import { EnrichedInput, notAllowedResponse } from "../../../auth/login";
import { Content } from "../../../components/content/content";
import { Head, Html } from "../../../components/site";
import { addRouteable, Routeable, RouteMeta, RouteMethod } from "../../../core/router";
import { Snippet } from "../../../model/snippets/snippet";
import { md } from "../../../util/helpers";
import { staticRouteFor } from "../../../util/static";
import adminCssPage from './clone-style.css';
import newBookSnippetScript from './new-book-snippet.js';

const MarkdownClientSide = () => <>
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.2.0/markdown-it.min.js"
    integrity="sha512-cTQeM/op796Fp1ZUxfech8gSMLT/HvrXMkRGdGZGQnbwuq/obG0UtcL04eByVa99qJik7WlnlQOr5/Fw5B36aw=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"></script>
</>;

const MonacoClientSide = () => <>
  <link rel="stylesheet" data-name="vs/editor/editor.main" href="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs/editor/editor.main.min.css" />
  <script>{`var require = { paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs' } }`}</script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs/loader.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs/editor/editor.main.nls.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.31.1/min/vs/editor/editor.main.js"></script>
</>

export class CloneSnippetPage implements Routeable {

  update;
  constructor(private snippet: Snippet) {
    this.update = new UpdateSnippetPage(snippet);
    addRouteable(this);
  }

  meta?: RouteMeta = { public: false };
  method: RouteMethod = 'GET';

  get route() {
    return `/clone-book-snippet/${this.snippet.date}-${this.snippet.slug}`;
  }

  handle(input: EnrichedInput): RouteOutput {
    if (!input.session?.isAdmin) return notAllowedResponse(input);

    return {
      body: <>
        <Html>
          <Head>
            <link rel='stylesheet' href={staticRouteFor(adminCssPage)} />
            <MarkdownClientSide />
            <MonacoClientSide />
          </Head>
          <body>
            <main>
              <div id='left-panel'>
                <form method='POST' action={this.update.route}>
                  <span>Link</span>    <input autocomplete='off' name='archiveLink' value={this.snippet.archiveLink} autofocus />
                  <span>Book</span>    <input autocomplete='off' name='bookSlug' value={this.snippet.bookSlug} />
                  <span>Title</span>   <input autocomplete='off' name='title' />
                  <span>Slug</span>    <input autocomplete='off' name='slug' />
                  <span>Content</span> <textarea name='markdownContent' />
                  <span />
                  <button>Create</button>
                </form>
                <Content>
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

            <script src={staticRouteFor(newBookSnippetScript)}></script>

          </body>
        </Html>
      </>
    };
  }

}

export class UpdateSnippetPage implements Routeable {

  constructor(private snippet: Snippet) {
    addRouteable(this);
  }

  meta?: RouteMeta = { public: false };
  method: RouteMethod = 'POST';

  get route() {
    return `/clone-book-snippet/${this.snippet.date}-${this.snippet.slug}`;
  }

  handle(input: EnrichedInput): RouteOutput {
    if (!input.session?.isAdmin) return notAllowedResponse(input);

    const params = new URLSearchParams(input.body.toString('utf8'));
    const newSnippet = Snippet.create({
      archiveLink: params.get('archiveLink')!,
      slug: params.get('slug')!,
      bookSlug: params.get('bookSlug')!,
      title: params.get('title')!,
      markdownContent: params.get('markdownContent')!,
    });
    return {
      status: 302,
      headers: { 'Location': newSnippet.view.route },
    };
  }

}
