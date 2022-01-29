import { addRouteable, Routeable, RouteMethod } from "../core/router";
import { HashedStaticFile } from "../core/static";
import { EnrichedInput } from "../pages/admin";
import { extract_page_number, format_date, md, reading_mins } from "../util/helpers";
import { Container, Content, HeroImage } from "../view/components/page";
import { QuickLinks } from "../view/components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../view/components/site";
import { LatestBookSnippets } from "./latest-list";
import { Snippet } from "./snippet";

export const snippetCss = HashedStaticFile.fromFile(__dir.filesByName['snippet.css']!);
addRouteable(snippetCss);

export class SnippetRoute implements Routeable {

  constructor(private snippet: Snippet) { }

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
            <Container>
              <Content>
                <h1>{this.snippet.title}</h1>

                {input.session?.isAdmin && <>
                  <a id='make-new-button' href={this.snippet.clone.route}>Make Next</a>
                </>}

                <p>{format_date(this.snippet.date)} &bull; {reading_mins(this.snippet.markdownContent)} min</p>
                <p>From <a href={this.snippet.book.route}>{this.snippet.book.title}</a>, page <a href={this.snippet.archiveLink}>{extract_page_number(this.snippet.archiveLink)}</a></p>

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
