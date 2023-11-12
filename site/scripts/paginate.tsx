import { Reactive, reactTo } from "./reactive.js";

for (const div of document.querySelectorAll<HTMLElement>('[data-paginate]')) {
  enablePagination(div, (+div.dataset["paginate"]!));
}

function enablePagination(parent: HTMLElement, perPage: number) {
  const items = [...parent.children] as HTMLElement[];
  if (items.length <= perPage) return;

  // for (const hide of items.slice(perPage)) {
  //   hide.hidden = true;
  // }

  const highestPage = items.length;

  const page = new Reactive(0);

  const visibleItems = Reactive.from({ page }, deps => {
    const start = deps.page.val * perPage;
    return items.slice(start, start + perPage);
  });

  const prevButton = <button
    style='width:2em'
    onclick={(e: Event) => {
      e.preventDefault();
      page.set(Math.max(0, page.val - 1));
    }}
  >&lsaquo;</button> as HTMLButtonElement;

  const nextButton = <button
    style='width:2em'
    onclick={(e: Event) => {
      e.preventDefault();
      page.set(Math.min(highestPage, page.val + 1));
    }}
  >&rsaquo;</button> as HTMLButtonElement;

  const currentPage = <span style='min-width:7em; text-align:center' /> as HTMLSpanElement;
  reactTo({ page }, deps => {
    if (highestPage === 0) {
      currentPage.textContent = 'n/a';
      return;
    }

    const start = (deps.page.val * perPage) + 1;
    const end = Math.min(highestPage, start + perPage - 1);
    currentPage.textContent = `${start} - ${end} / ${highestPage}`;
  });

  reactTo({ page }, deps => {
    nextButton.toggleAttribute('disabled', deps.page.val === highestPage);
  });

  reactTo({ page }, deps => {
    prevButton.toggleAttribute('disabled', deps.page.val === 0);
  });

  reactTo({ page }, deps => {
    const start = deps.page.val * perPage;
    const end = start + perPage;

    for (let i = 0; i < items.length; i++) {
      const item = items[i]!;
      item.hidden = i < start || i >= end;
    }
  });

  const paginators = (
    <p style='display:flex; gap:1em; align-items:baseline'>{prevButton} {currentPage} {nextButton}</p>

  ) as HTMLParagraphElement;

  parent.insertAdjacentElement('afterbegin', paginators);

  console.log(parent, perPage);
}
