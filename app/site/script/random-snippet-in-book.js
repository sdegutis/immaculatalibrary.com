import { snippetsData } from "./modules/load-snippets.js";

const button = document.getElementById('random-snippet-in-book-button');

button.onclick = (e) => {
  e.preventDefault();
  snippetsData.then(({ snippets }) => {
    snippets = snippets.filter(s => s.book === button.dataset.book);
    const i = Math.floor(Math.random() * snippets.length);
    window.location = snippets[i].url;
  });
};
