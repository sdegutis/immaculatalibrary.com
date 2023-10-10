import { allBooks } from '../../model/books';

export default <>
  {JSON.stringify(allBooks.map(book => ({
    route: book.route,
  })))}
</>;
