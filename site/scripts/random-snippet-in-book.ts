const button = document.getElementById('random-snippet-in-book-button') as HTMLAnchorElement;
button.onclick = (e) => {
  const ul = document.querySelector<HTMLUListElement>('.snippets-in-book')!;
  const as = [...ul.querySelectorAll('a')];
  const i = Math.floor(Math.random() * as.length);
  const a = as[i]!;
  button.href = a.href;
};