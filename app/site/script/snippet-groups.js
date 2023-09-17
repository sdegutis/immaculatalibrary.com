const snippetsData = fetch('/data/snippets.json').then(res => res.json());

function showSnippetGroups(filter) {
  const host = document.querySelector('.snippets-latest');
  snippetsData.then(snippets => {
    snippets = snippets.filter(filter);
    const groups = Object.entries(groupByDate(snippets));
    host.innerHTML = groups.map(([date, group]) => `
      <li>
        <h4>${date}</h4>
        <ul>
          ${group.map(snippet => `
            <li>
              <p>
                <a href="${snippet.url}">${snippet.title}</a>
                <br /> ${snippet.readingMins} min &mdash; ${snippet.bookTitle}
              </p>
            </li>
          `).join('')}
        </ul>
      </li>
    `).join('');
  });
}

function groupByDate(array) {
  const groups = Object.create(null);
  for (const o of array) {
    const d = formatDate(o.date);
    console.log(o.date, d)
    if (!groups[d]) groups[d] = [];
    groups[d].push(o);
  }
  return groups;
}

function formatDate(dateStr) {
  return new Date(dateStr.split('-')).toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
