import { showSnippetGroups } from './snippet-groups.js';

const input = document.getElementById('search-book-snippets-field');

let timer = null;
input.addEventListener('input', (e) => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(searchBookSnippets, 250);
});

searchBookSnippets();

async function searchBookSnippets() {
  const searchTerm = input.value.trim().toLowerCase();

  if (searchTerm) {
    showSnippetGroups(s => s.searchable.includes(searchTerm));
  }
  else {
    showSnippetGroups(s => true);
  }
}
