for (const button of document.querySelectorAll('.random-book-button')) {
  button.onclick = (e) => {
    const ul = document.getElementById('books-all');
    const as = [...ul.querySelectorAll('a')];
    const i = Math.floor(Math.random() * as.length);
    const a = as[i];
    button.href = a.href;
  };
}
