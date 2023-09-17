import { allBooks } from "../../model/models";

export default <>
  {JSON.stringify(allBooks.map(book => ({
    route: book.route,
  })))}
</>;
