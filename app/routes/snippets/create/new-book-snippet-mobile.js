const titleInput = document.querySelector('input[name=title]');
const slugInput = document.querySelector('input[name=slug]');
const contentInput = document.querySelector('textarea[name=markdownContent]');
const fixupButton = document.querySelector('button#fixup');

const slugify = str => str.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');

titleInput.addEventListener('input', (e) => {
  slugInput.value = slugify(titleInput.value);
});

fixupButton.onclick = (e) => {
  e.preventDefault();

  contentInput.value = (contentInput.value
    .replace(/ {2,}/g, ' ')
    .replace(/ ;/g, ';')
    .replace(/ :/g, ';')
    .replace(/- /g, '')
    .replace(/ !/g, '!')
    .replace(/ \?/g, '?')
    .replace(/^/gm, '> ')
  );
};
