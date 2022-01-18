const md = markdownit({ typographer: true, html: true, linkify: true });

const markdownSourceEl = document.getElementById('markdown-src');
const markdownPreviewEl = document.getElementById('markdown-preview');
const previewArea = document.getElementById('preview-area');

const bookSnippetIdEl = document.querySelector('input[name=id]');
const bookSnippetId = bookSnippetIdEl.value;

function previewContent(userEdit) {
  const end = previewArea.scrollHeight - previewArea.offsetHeight;
  const isAtBottom = previewArea.scrollTop >= (end - 20);

  const html = md.render(markdownSourceEl.value);
  markdownPreviewEl.innerHTML = html;

  if (isAtBottom) {
    previewArea.scrollTo({
      top: previewArea.scrollHeight,
      behavior: userEdit ? 'smooth' : 'auto',
    });
  }
}

markdownSourceEl.addEventListener('input', previewContent.bind(null, true));
previewContent(false);

const slugInput = document.querySelector('input[name=slug]');
const titleInput = document.querySelector('input[name=title]');

if (!slugInput.value) {
  const slugify = str => str.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');

  titleInput.addEventListener('input', (e) => {
    slugInput.value = slugify(titleInput.value);
  });
}
