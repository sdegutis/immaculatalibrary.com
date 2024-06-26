export { };

const chapterLinks = [...document.querySelectorAll<HTMLSpanElement>('.chapter-link')];
const chapterDivs = [...document.querySelectorAll<HTMLDivElement>('.chapter')];

const chapters: {
  div: HTMLDivElement,
  link: HTMLSpanElement,
  slug: string,
  i: number,
}[] = [];
for (let i = 0; i < chapterDivs.length; i++) {
  const div = chapterDivs[i]!;
  const link = chapterLinks[i]!;
  const slug = div.id.replace(/^snippet-/, '');
  chapters.push({ div, link, slug, i });

  const moveUp = <button>Move up</button> as HTMLButtonElement;
  const moveDown = <button>Move down</button> as HTMLButtonElement;

  moveUp.onclick = (e) => moveSnippet(i, -1);
  moveDown.onclick = (e) => moveSnippet(i, 1);

  const buttons = <div>{moveUp} {moveDown}</div> as HTMLDivElement;
  div.querySelector('h3')!.insertAdjacentElement('afterend', buttons);
}

function saveOrder() {
  const json = chapters.map(c => ({ slug: c.slug, i: c.i }));
  fetch('/reorder-snippets-in-book', {
    method: 'POST',
    body: JSON.stringify(json),
  });
}

function moveSnippet(i: number, by: number) {
  const c = chapters[i]!;
  if (by === -1) {
    c.div.previousElementSibling!.insertAdjacentElement('beforebegin', c.div);
    c.link.previousElementSibling!.insertAdjacentElement('beforebegin', c.link);
  }
  else {
    c.div.nextElementSibling!.insertAdjacentElement('afterend', c.div);
    c.link.nextElementSibling!.insertAdjacentElement('afterend', c.link);
  }

  // chapters.

  saveOrder();
}
