import { allSnippets } from "../../model/models";

export default <>
  {JSON.stringify(allSnippets.map(snippet => ({
    book: snippet.bookSlug,
    route: snippet.route,
  })))}
</>;
