import { EnrichedInput } from "../../../auth/login";
import { Container } from "../../../components/container/container";
import { Content } from "../../../components/content/content";
import { HeroImage } from "../../../components/hero-image/hero-image";
import { QuickLinks } from "../../../components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../../../components/site";
import { addRouteable, Routeable, RouteMeta, RouteMethod } from "../../../core/router";
import { Snippet } from "../../../model/snippets/snippet";
import { extract_page_number, format_date, md, reading_mins } from "../../../util/helpers";
import { HashedStaticFile } from "../../../util/static";
import { AdminButton } from "../admin-button/admin-button";
import { LatestBookSnippets } from "../latest-list";

export const snippetCss = HashedStaticFile.fromFile(__dir.filesByName['snippet.css']!);
addRouteable(snippetCss);

export class SnippetRoute implements Routeable {

  constructor(private snippet: Snippet) {
    this.meta = {
      lastModifiedDate: snippet.date,
    };
  }

  meta?: RouteMeta;

  get route() {
    return `/book-snippets/${this.snippet.date}-${this.snippet.slug}.html`;
  }

  method: RouteMethod = 'GET';

  handle(input: EnrichedInput): RouteOutput {
    return {
      body: <Html>
        <Head title={this.snippet.title}>
          <link rel="stylesheet" href={snippetCss.route} />
        </Head>
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={this.snippet.image} />
            <Container spaced split>
              <Content>
                <h1>{this.snippet.title}</h1>

                {input.session?.isAdmin && <>
                  <AdminButton href={this.snippet.clone.route}>Make Next</AdminButton>
                </>}

                <p>{format_date(this.snippet.date)} &bull; {reading_mins(this.snippet.markdownContent)} min</p>
                <p>From <a href={this.snippet.book.view.route}>{this.snippet.book.title}</a>, page <a href={this.snippet.archiveLink}>{extract_page_number(this.snippet.archiveLink)}</a></p>

                {md.render(this.snippet.markdownContent)}

              </Content>
              <div>
                <LatestBookSnippets />
              </div>
            </Container>
          </main>
          <QuickLinks />
          <SiteFooter input={input} />
        </body>
      </Html>
    }
  }

}
