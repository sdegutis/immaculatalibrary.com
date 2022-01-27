import { Snippet, snippetsById } from ".";
import { Routeable } from "../core/router";
import { guardAuth } from "../pages/admin";
import { md } from "../util/helpers";
import { Content } from "../view/components/page";
import { Head, Html, SiteFooter, SiteHeader } from "../view/components/site";

export function makeCloneRouteFor(snippet: Snippet) {
  const q = new URLSearchParams({ id: snippet.id });
  return `${cloneSnippetPage.route}?${q}`;
}

export const cloneSnippetPage: Routeable = {
  route: `/admin/clone-snippet`,
  method: 'GET',
  handle: guardAuth((input) => {

    const snippet = snippetsById.get(input.url.searchParams.get('id')!)!;

    return {
      body: <>
        <Html>
          <Head />
          <body>
            <SiteHeader />
            <main>
              <div style='padding:1em;display:grid;gap:1em;grid-template-columns:1fr 1fr 1fr 1fr'>
                <div>
                  <Content>
                    <h1>{snippet.title}</h1>
                    {md.render(snippet.markdownContent)}
                  </Content>
                </div>
                <div></div>
                <div></div>
                <div>
                  <iframe style='width:100%;height:100%' src={snippet.archiveLink}></iframe>
                </div>
              </div>
            </main>
            <SiteFooter input={input} />
          </body>
        </Html>
      </>
    };
  }),
};
