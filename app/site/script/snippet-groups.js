import { snippetsData } from "./modules/load-snippets.js";
import { formatAllDates } from '/components/format-date/formatdate.js';

export function showSnippetGroups(filter) {
  const host = document.getElementById('snippets-group-area');
  snippetsData.then(snippetInfo => {
    const snippets = snippetInfo.snippets.filter(filter);
    const groups = Object.entries(groupByDate(snippets));
    host.innerHTML = `
      <p>
        <a href='/snippets.html'>Search</a> |
        <a href='#' class='get-random-book-snippet'>Random</a> |
        ${snippetInfo.snippets.length} total |
        ${snippetInfo.totalReadingTime}
      </p>
      <ul class="snippets-latest">
        ${groups.map(([date, group]) => `
          <li>
            <h4 class='format-date'>${date}</h4>
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

    formatAllDates();

    const randomButton = host.querySelector('.get-random-book-snippet');
    randomButton.addEventListener('click', e => {
      e.preventDefault();

      const i = Math.floor(Math.random() * snippetInfo.snippets.length);
      window.location = snippetInfo.snippets[i].url;
    });
  });
}

function groupByDate(array) {
  const groups = Object.create(null);
  for (const o of array) {
    const d = o.date;
    if (!groups[d]) groups[d] = [];
    groups[d].push(o);
  }
  return groups;
}
