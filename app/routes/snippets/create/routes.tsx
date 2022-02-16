import { Content } from "../../../components/content/content";
import { Head, Html } from "../../../components/site";
import { renderElement } from "../../../core/jsx";
import { addRouteable, Routeable, RouteMeta, RouteMethod } from "../../../core/router";
import { Snippet } from "../../../model/snippets/snippet";
import { calculateReadingMins, markdown } from "../../../util/helpers";
import { notAllowedResponse } from "../../../util/restricted/login";
import { staticRouteFor } from "../../../util/static";
import adminFormCss from './admin-form.css';
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
  route;
  constructor(private snippet: Snippet, id: string) {
    this.route = `/clone-book-snippet/${id}`;
    this.update = new CreateSnippetRoute(this.route);
    addRouteable(this);
  }

  meta?: RouteMeta = { public: false };
  method: RouteMethod = 'GET';

  handle(input: RouteInput): RouteOutput {
    if (!input.session?.isAdmin) return notAllowedResponse(input);

    return {
      body: renderElement(<>
        <Html>
          <Head />
          <body>
            <link rel='stylesheet' href={staticRouteFor(adminCssPage)} />
            <link rel='stylesheet' href={staticRouteFor(adminFormCss)} />
            <MarkdownClientSide />
            <MonacoClientSide />
            <script>{calculateReadingMins.toString()}</script>

            <main>
              <div id='left-panel'>
                <form method='POST' action={this.update.route}>
                  <span>Page</span>    <input autocomplete='off' name='archivePage' value={this.snippet.archivePage} autofocus />
                  <span>Link</span>    <input autocomplete='off' name='archiveSlug' value={this.snippet.archiveSlug} />
                  <span>Book</span>    <input autocomplete='off' name='bookSlug' value={this.snippet.bookSlug} />
                  <span>Title</span>   <input autocomplete='off' name='title' />
                  <span>Slug</span>    <input autocomplete='off' name='slug' />
                  <span>Text</span> <textarea name='markdownContent' />

                  <span id='readingmins'></span> <button>Create</button>
                </form>
                <Content>
                  {markdown.render(this.snippet.markdownContent)}
                </Content>
              </div>
              <div id='editorarea'></div>
              <div style='padding-right:1em'>
                <Content>
                  <div id='previewarea'></div>
                </Content>
              </div>
              <div style='overflow:hidden'>
                <iframe src={this.snippet.archiveLink}></iframe>
              </div>
            </main>

            <script src={staticRouteFor(newBookSnippetScript)} defer></script>

          </body>
        </Html>
      </>)
    };
  }

}

export class NewSnippetPage implements Routeable {

  update;
  route;
  archiveLink;
  constructor(private archiveSlug: string, private bookSlug: string) {
    this.route = `/new-book-snippet/${bookSlug}/${archiveSlug}`;
    this.update = new CreateSnippetRoute(this.route);
    this.archiveLink = `https://archive.org/details/${archiveSlug}?view=theater`;
    addRouteable(this);
  }

  meta?: RouteMeta = { public: false };
  method: RouteMethod = 'GET';

  handle(input: RouteInput): RouteOutput {
    if (!input.session?.isAdmin) return notAllowedResponse(input);

    return {
      body: renderElement(<>
        <Html>
          <Head />
          <body>

            <link rel='stylesheet' href={staticRouteFor(adminCssPage)} />
            <MarkdownClientSide />
            <MonacoClientSide />
            <script>{calculateReadingMins.toString()}</script>
            <main>
              <div id='left-panel'>
                <form method='POST' action={this.update.route}>
                  <span>Page</span>    <input autocomplete='off' name='archivePage' autofocus />
                  <span>Link</span>    <input autocomplete='off' name='archiveSlug' value={this.archiveSlug} />
                  <span>Book</span>    <input autocomplete='off' name='bookSlug' value={this.bookSlug} />
                  <span>Title</span>   <input autocomplete='off' name='title' />
                  <span>Slug</span>    <input autocomplete='off' name='slug' />
                  <span>Text</span>    <textarea name='markdownContent' />

                  <span id='readingmins'></span> <button>Create</button>
                </form>
              </div>
              <div id='editorarea'></div>
              <div style='padding-right:1em'>
                <Content>
                  <div id='previewarea'></div>
                </Content>
              </div>
              <div style='overflow:hidden'>
                <iframe src={this.archiveLink}></iframe>
              </div>
            </main>

            <script src={staticRouteFor(newBookSnippetScript)}></script>

          </body>
        </Html>
      </>)
    };
  }

}

export class CreateSnippetRoute implements Routeable {

  constructor(public route: string) {
    addRouteable(this);
  }

  meta?: RouteMeta = { public: false };
  method: RouteMethod = 'POST';

  handle(input: RouteInput): RouteOutput {
    if (!input.session?.isAdmin) return notAllowedResponse(input);

    const params = new URLSearchParams(input.body.toString('utf8'));
    const newSnippet = Snippet.create({
      archiveSlug: params.get('archiveSlug')!,
      archivePage: params.get('archivePage')!,
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

export class EditSnippetRoute implements Routeable {

  route;
  constructor(private snippet: Snippet) {
    this.route = `/edit-snippet/${snippet.date}-${snippet.slug}`;
    addRouteable(this);
  }

  meta?: RouteMeta = { public: false };
  method: RouteMethod = 'POST';

  handle(input: RouteInput): RouteOutput {
    if (!input.session?.isAdmin) return notAllowedResponse(input);

    const params = new URLSearchParams(input.body.toString('utf8'));

    this.snippet.update({
      archivePage: params.get('archivePage')!,
      archiveSlug: params.get('archiveSlug')!,
      bookSlug: params.get('bookSlug')!,
      title: params.get('title')!,
      markdownContent: params.get('markdownContent')!,
    });

    return {
      status: 302,
      headers: { 'Location': this.snippet.view.route },
    };
  }

}
