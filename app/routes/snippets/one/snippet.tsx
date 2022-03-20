import { AdminButton } from "../../../components/admin-button/admin-button";
import { Container } from "../../../components/container/container";
import { Content } from "../../../components/content/content";
import { SiteCommon } from "../../../components/site";
import { renderElement } from "../../../core/jsx";
import { addRouteable, Routeable, RouteMeta, RouteMethod } from "../../../core/router";
import { Snippet } from "../../../model/snippets/snippet";
import { sortedTags } from "../../../model/snippets/tag";
import { calculateReadingMins, formatDate, markdown, sameSiteReferer } from "../../../util/helpers";
import { staticRouteFor } from "../../../util/static";
import adminFormCss from '../create/admin-form.css';
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

export class SnippetRoute implements Routeable {

  constructor(private snippet: Snippet) {
    this.meta = {
      lastModifiedDate: snippet.date,
    };
    addRouteable(this);
  }

  meta?: RouteMeta;

  get route() {
    return `/book-snippets/${this.snippet.date}-${this.snippet.slug}.html`;
  }

  method: RouteMethod = 'GET';

  handle(input: RouteInput): RouteOutput {
    return {
      body: renderElement(<SiteCommon
        title={this.snippet.title}
        image={this.snippet.image}
        input={input}
      >
        <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['snippet.css']!)} />
        <Container spaced split>
          <Content>

            <h1>{markdown.renderInline(this.snippet.title)}</h1>

            <p>{formatDate(this.snippet.date)} &bull; {calculateReadingMins(this.snippet.markdownContent)} min</p>

            {input.session?.isAdmin && <>
              <PrevNextLinks snippet={this.snippet} open />
              <div>
                <AdminButton href={this.snippet.clone.route}>Make Next</AdminButton> { }
                <AdminButton href={this.snippet.cloneMobile.route}>Make Next Mobile</AdminButton> { }
                <AdminButton href='#' onclick='document.getElementById(`edit-snippet-form`).style.display=`grid`; return false;'>Edit</AdminButton>
                <h3>Tags ({this.snippet.tags.size})</h3>
                <form method='POST' action={this.snippet.createTag.route}>
                  <ul>
                    {sortedTags().map(tag => <>
                      <li>
                        <label>
                          <input type='checkbox' checked={this.snippet.tags.has(tag)} name={tag.name} /> { }
                          {tag.name}
                        </label>
                      </li>
                    </>)}
                    <li>
                      <script>{addCheckbox.toString()}</script>
                      <button onclick={`${addCheckbox.name}(this, event)`}>Add</button>
                      <button>Save</button>
                    </li>
                  </ul>
                </form>
              </div>
            </>}

            <p>
              {[...this.snippet.tags].map(tag => <>
                <a href={tag.view.route}>#{tag.slug}</a> { }
              </>)}
            </p>

            <p>
              From <a href={this.snippet.book.view.route}>{this.snippet.book.title}</a>, { }
              page <a rel="noopener" href={this.snippet.archiveLink}>{this.snippet.archivePage}</a>
              <br />
              <small>By {this.snippet.book.author}</small>
            </p>

            {markdown.render(this.snippet.markdownContent)}

            <PrevNextLinks snippet={this.snippet} open />

          </Content>
          <div>
            {input.session?.isAdmin && <>
              <link rel='stylesheet' href={staticRouteFor(adminFormCss)} />
              <form id='edit-snippet-form' method="POST" action={this.snippet.edit.route} style='display:none'>
                <span>Page</span>    <input autocomplete='off' name='archivePage' value={this.snippet.archivePage} autofocus />
                <span>Link</span>    <input autocomplete='off' name='archiveSlug' value={this.snippet.archiveSlug} />
                <span>Book</span>    <input autocomplete='off' name='bookSlug' value={this.snippet.bookSlug} />
                <span>Title</span>   <input autocomplete='off' name='title' value={this.snippet.title} />
                <span>Text</span>    <textarea name='markdownContent' rows='10'>{this.snippet.markdownContent}</textarea>

                <span id='readingmins'></span> <button>Update</button>
              </form>
            </>}

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
