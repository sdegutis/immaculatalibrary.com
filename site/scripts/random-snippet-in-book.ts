import { randomElement } from "./util.js";

const button = document.getElementById('random-snippet-in-book-button') as HTMLAnchorElement;
button.onclick = (e) => {
  const ul = document.querySelector<HTMLUListElement>('.snippets-in-book')!;
  const as = [...ul.querySelectorAll('a')];
  const a = randomElement(as);
  button.href = a.href;
};
