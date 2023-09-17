const books = fetch('/data/books.json').then(res => res.json());

for (const button of document.querySelectorAll('.random-book-button')) {
  button.onclick = (e) => {
    e.preventDefault();
    books.then(book => {
      const i = Math.floor(Math.random() * book.length);
      window.location = book[i].route;
    });
  };
}
