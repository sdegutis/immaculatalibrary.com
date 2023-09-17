import { allSnippets } from "../../model/models";

export default <>
  {JSON.stringify(allSnippets.map(snippet => ({
    slug: snippet.slug,
    book: snippet.bookSlug,
    route: snippet.route,
  })))}
</>;
