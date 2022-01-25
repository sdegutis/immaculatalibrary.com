const md = markdownit({ typographer: true, html: true, linkify: true, breaks: true });

const markdownSourceEl = document.getElementById('markdown-src');
const markdownPreviewEl = document.getElementById('markdown-preview');
const previewArea = document.getElementById('preview-area');

const bookSnippetIdEl = document.querySelector('input[name=id]');
const bookSnippetId = bookSnippetIdEl.value;
const published = ('published' in bookSnippetIdEl.dataset);
const archiveLink = document.querySelector('input[name=archiveLink]').value;

const saveThrottled = throttle(save, 5000);

function previewContent(userEdit) {
  const end = previewArea.scrollHeight - previewArea.offsetHeight;
  const isAtBottom = previewArea.scrollTop >= (end - 20);

  const html = md.render(markdownSourceEl.value);
  markdownPreviewEl.innerHTML = html;

  if (userEdit && !published) {
    saveThrottled();
  }

  if (isAtBottom) {
    previewArea.scrollTo({
      top: previewArea.scrollHeight,
      behavior: userEdit ? 'smooth' : 'auto',
    });
  }
}

markdownSourceEl.addEventListener('input', previewContent.bind(null, true));
previewContent(false);

async function save() {
  const res = await fetch(`/admin-panel/book-snippet?id=${bookSnippetId}`, {
    method: 'PUT',
    body: markdownSourceEl.value,
  });
  const mins = await res.json();
  document.getElementById('reading-mins').innerText = `${mins} mins`;
}

function throttle(fn, delay) {
  let timer = null;
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        fn(...args);
        timer = null;
      }, delay);
    }
  };
}

const slugInput = document.querySelector('input[name=slug]');
const titleInput = document.querySelector('input[name=title]');

if (!slugInput.value) {
  const slugify = str => str.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');

  titleInput.addEventListener('input', (e) => {
    slugInput.value = slugify(titleInput.value);
  });
}
