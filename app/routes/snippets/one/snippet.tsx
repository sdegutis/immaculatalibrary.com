import { Container } from "../../../components/container/container";
import { Content } from "../../../components/content/content";
import { SiteCommon } from "../../../components/site";
import { renderElement } from "../../../core/jsx";
import { addRouteable, Routeable, RouteMeta, RouteMethod } from "../../../core/router";
import { Snippet } from "../../../model/snippets/snippet";
import { calculateReadingMins, formatDate, sameSiteReferer } from "../../../util/helpers";
import { staticRouteFor } from "../../../util/static";
import { LatestBookSnippets } from "../latest-list";

export class CreateTagRoute implements Routeable {

  route;
  method: RouteMethod = 'POST';

  constructor(private snippet: Snippet) {
    this.route = `/book-snippets/${this.snippet.date}-${this.snippet.slug}/create-tag`;
    addRouteable(this);
  }

  handle(input: RouteInput): RouteOutput {
    const text = input.body.toString('utf8');
    const form = new URLSearchParams(text);

    const tagsObject = Object.fromEntries(form.entries());
    delete tagsObject["_newtag"];

    const tags = [...Object.keys(tagsObject), ...form.getAll('_newtag')].filter(tag => tag);
    this.snippet.setTags(tags);

    return {
      status: 302,
      headers: { 'Location': sameSiteReferer(input)?.href ?? '/' },
    };
  }

}

function addCheckbox(button: HTMLButtonElement, e: Event) {
  e.preventDefault();
  const li = document.createElement('li');
  li.innerHTML = `<input name='_newtag'>`;
  button.parentElement?.insertAdjacentElement('beforebegin', li);
  li.querySelector('input')!.focus();
}

export function makeSnippetRoute(snippet: Snippet) {
  return `/book-snippets/${snippet.date}-${snippet.slug}.html`;
}

export class SnippetRoute implements Routeable {

  constructor(private snippet: Snippet) {
    this.meta = {
      lastModifiedDate: snippet.date,
    };
    addRouteable(this);
  }

  meta?: RouteMeta;

  get route() {
    return makeSnippetRoute(this.snippet);
  }

  method: RouteMethod = 'GET';

  handle(input: RouteInput): RouteOutput {
    const singleFile = this.snippet.book.archiveFiles.length === 1;
    const specificBookName = (!singleFile && this.snippet.book.archiveFiles
      .find(file => file.archiveId === this.snippet.archiveSlug)
      ?.pdfFile
      .replace('.pdf', ''));

    return {
      body: renderElement(<SiteCommon
        title={this.snippet.title}
        image={this.snippet.image}
        input={input}
      >
        <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['snippet.css']!)} />
        <Container spaced split>
          <Content>

            <h1>{this.snippet.renderedTitle}</h1>

            <p>{formatDate(this.snippet.date)} &bull; {calculateReadingMins(this.snippet.markdownContent)} min</p>

            <p>
              {[...this.snippet.tags].map(tag => <>
                <a href={tag.view.route}>#{tag.slug}</a> { }
              </>)}
            </p>

            <p>
              From <a href={this.snippet.book.view.route}>{this.snippet.book.title}</a>, { }
              {specificBookName && <>in file "{specificBookName}", </>}
              page <a rel="noopener" href={this.snippet.archiveLink}>{this.snippet.archivePage}</a>
              <br />
              <small>By {this.snippet.book.author}</small>
            </p>

            {this.snippet.renderedBody}

            <PrevNextLinks snippet={this.snippet} open />

          </Content>
          <div>
            <LatestBookSnippets />
          </div>
        </Container>
      </SiteCommon>)
    }
  }

}

const PrevNextLinks: JSX.Component<{ snippet: Snippet, open?: boolean }> = ({ snippet, open }) => <>
  <div class='prevnextlinks' open={open ?? false}>
    <span class='header'>Other snippets in this book</span>
    <div>
      <RelativeSnippetLink snippet={snippet.prevSnippet}>Previous</RelativeSnippetLink>
      <span>
        <a href={snippet.book.view.route}>All</a>
        <br />
        {snippet.book.snippets.length} total
      </span>
      <RelativeSnippetLink snippet={snippet.nextSnippet}>Next</RelativeSnippetLink>
    </div>
  </div>
</>;

const RelativeSnippetLink: JSX.Component<{ snippet: Snippet | undefined }> = ({ snippet }, children) => <>
  <span>
    {snippet && <>
      <a href={snippet.view.route}>{children}</a><br />
      p.{snippet.archivePage}
    </>}
  </span>
</>;
