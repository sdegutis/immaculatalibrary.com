import { snippetsData } from "./modules/load-snippets.js";

window.showSnippetGroups = showSnippetGroups;

function showSnippetGroups(filter) {
  const host = document.getElementById('snippets-group-area');
  snippetsData.then(snippetInfo => {
    const snippets = snippetInfo.snippets.filter(filter);
    const groups = Object.entries(groupByDate(snippets));
    host.innerHTML = `
      <p>
        <a href='/snippets.html'>Search</a> |
        <a href='#'>Random</a> |
        ${snippetInfo.snippets.length} total |
        ${snippetInfo.totalReadingTime}
      </p>
      <ul class="snippets-latest">
        ${groups.map(([date, group]) => `
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
        `).join('')}
      </ul>
    `;
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
