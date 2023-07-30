const input = document.getElementById('search-book-snippets-field');

const searchResultsContainer = document.getElementById('search-results');

let timer = null;
input.addEventListener('input', (e) => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(searchBookSnippets, 250);
});

let jsonResults;
fetch('/book-snippets/searchable.json')
  .then(res => res.json())
  .then(json => jsonResults = json);

function searchBookSnippets() {
  if (!jsonResults) return;

  const searchTerm = input.value.trim().toLowerCase();
  const results = searchTerm
    ? jsonResults.filter(s => s.searchable.includes(searchTerm))
    : null;

  if (!results) {
    searchResultsContainer.textContent = '';
  }
  else if (results.length === 0) {
    searchResultsContainer.innerHTML = `<p><i>No results</i></p>`;
  }
  else {
    searchResultsContainer.innerHTML = `<p><i>Search results (${results.length} book snippets)</i></p>`;

    const list = document.createElement('ul');
    searchResultsContainer.append(list);

    for (const row of results) {
      const rowEl = document.createElement('li');
      rowEl.innerHTML = `
        <a href="${row.url}">${row.title}</a>
        <br/>
        ${row.readingMins} mins &mdash; ${row.formattedDate}
        <br/>
        ${row.bookTitle}
      `.trim();
      list.append(rowEl);
    }
  }
}
