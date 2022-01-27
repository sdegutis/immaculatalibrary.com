import { Snippet } from ".";
import { Routeable } from "../core/router";
import { EnrichedInput } from "../pages/admin";
import { extract_page_number, format_date, md, reading_mins, ShareLinks } from "../util/helpers";
import { Container, Content, HeroImage } from "../view/components/page";
import { QuickLinks } from "../view/components/quicklinks";
import { Head, Html, SiteFooter, SiteHeader } from "../view/components/site";
import { LatestBookSnippets } from "./latest-list";
import { RouteOutput } from "/src/http";

export class SnippetRoute implements Routeable {

  constructor(private snippet: Snippet) { }

  get route() {
    return `/book-snippets/${this.snippet.date}-${this.snippet.slug}.html`;
  }

  method = 'GET' as const;

  handle(input: EnrichedInput): RouteOutput {
    return {
      body: <Html>
        <Head title={this.snippet.title}>
          <link rel="stylesheet" href="/css/layout/book-snippet.css" />
        </Head>
        <body>
          <SiteHeader />
          <main>
            <HeroImage image={this.snippet.image} />
            <Container>
              <Content>
                <h1>{this.snippet.title}</h1>

                <p>{format_date(this.snippet.date)} &bull; {reading_mins(this.snippet.markdownContent)} min</p>
                <p>From <a href={this.snippet.book.route}>{this.snippet.book.title}</a>, page <a href={this.snippet.archiveLink}>{extract_page_number(this.snippet.archiveLink)}</a></p>

                {md.render(this.snippet.markdownContent)}

                <ShareLinks />
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
