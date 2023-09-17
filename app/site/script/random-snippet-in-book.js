const snippetsData = fetch('/data/snippets.json').then(res => res.json());
const button = document.getElementById('random-snippet-in-book-button');

button.onclick = (e) => {
  e.preventDefault();
  snippetsData.then(snippets => {
    snippets = snippets.filter(s => s.book === button.dataset.book);
    const i = Math.floor(Math.random() * snippets.length);
    window.location = snippets[i].route;
  });
};
