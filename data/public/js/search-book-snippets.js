const input = document.getElementById('search-book-snippets-field');

const searchResultsContainer = document.getElementById('search-results');

let timer = null;
input.addEventListener('input', (e) => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(searchBookSnippets, 250);
});

async function searchBookSnippets() {
  const searchTerm = input.value.trim();
  let results = null;

  if (searchTerm) {
    const response = await fetch('/book-snippets/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchTerm,
      }),
    });
    results = await response.json();
  }

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
