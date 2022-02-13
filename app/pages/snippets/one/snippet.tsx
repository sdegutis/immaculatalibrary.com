import { EnrichedInput } from "../../../auth/login";
import { AdminButton } from "../../../components/admin-button/admin-button";
import { Container } from "../../../components/container/container";
import { Content } from "../../../components/content/content";
import { HeroImage } from "../../../components/hero-image/hero-image";
import { QuickLinks } from "../../../components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../../../components/site";
import { addRouteable, Routeable, RouteMeta, RouteMethod } from "../../../core/router";
import { Snippet } from "../../../model/snippets/snippet";
import { format_date, md, reading_mins } from "../../../util/helpers";
import { renderElement } from "../../../util/jsx";
import { staticRouteFor } from "../../../util/static";
import adminFormCss from '../create/admin-form.css';
import { LatestBookSnippets } from "../latest-list";

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

  handle(input: EnrichedInput): RouteOutput {
    return {
      body: renderElement(<Html>
        <Head title={this.snippet.title}>
          <link rel="stylesheet" href={staticRouteFor(__dir.filesByName['snippet.css']!)} />
        </Head>
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={this.snippet.image} />
            <Container spaced split>
              <Content>

                <h1>{md.renderInline(this.snippet.title)}</h1>

                {input.session?.isAdmin && <>
                  <PrevNextLinks snippet={this.snippet} open />
                  <div>
                    <AdminButton href={this.snippet.clone.route}>Make Next</AdminButton> { }
                    <AdminButton href='#' onclick='document.getElementById(`edit-snippet-form`).style.display=`grid`; return false;'>Edit</AdminButton>
                  </div>
                </>}

                <p>{format_date(this.snippet.date)} &bull; {reading_mins(this.snippet.markdownContent)} min</p>

                <p>
                  From <a href={this.snippet.book.view.route}>{this.snippet.book.title}</a>, { }
                  page <a rel="noopener" href={this.snippet.archiveLink}>{this.snippet.archivePage}</a>
                  <br />
                  <small>By {this.snippet.book.author}</small>
                </p>


                {md.render(this.snippet.markdownContent)}

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
          </main>
          <QuickLinks />
          <SiteFooter input={input} />
        </body>
      </Html>)
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
