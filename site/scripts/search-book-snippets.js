const data = fetch('/dynamic/snippets.json').then(res => res.json());

const input = document.getElementById('search-book-snippets-field');

let timer = null;
input.addEventListener('input', (e) => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(searchBookSnippets, 250);
});

searchBookSnippets();

async function searchBookSnippets() {
  const host = document.querySelector('.snippets-latest');
  const searchable = await data;
  const searchTerm = input.value.trim().toLowerCase();

  for (const li of host.querySelectorAll('li ul li')) {
    if (searchTerm) {
      const slug = li.dataset['slug'];
      li.hidden = !(searchable[slug].includes(searchTerm));
    }
    else {
      li.hidden = false;
    }
  }

  for (const li of host.children) {
    li.hidden = [...li.querySelectorAll('li')].every(li => li.hidden);
  }
}
