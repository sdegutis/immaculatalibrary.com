import { Reactive, reactTo } from "./reactive.js";

export function makePaginator<T>(
  matchingItems: Reactive<T[]>,
  perPage: number,
) {
  const page = new Reactive(0);

  const highestPage = Reactive.from({ matchingItems, }, (deps) => {
    return Math.max(0, Math.floor((deps.matchingItems.val.length - 1) / perPage));
  });

  const matchingCount = Reactive.from({ matchingItems }, deps => deps.matchingItems.val.length);

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
      page.set(Math.min(highestPage.val, page.val + 1));
    }}
  >&rsaquo;</button> as HTMLButtonElement;

  reactTo({ page, highestPage }, deps => {
    nextButton.toggleAttribute('disabled', deps.page.val === deps.highestPage.val);
  });

  reactTo({ page }, deps => {
    prevButton.toggleAttribute('disabled', deps.page.val === 0);
  });

  const currentPage = <span style='min-width:7em; text-align:center' /> as HTMLSpanElement;
  reactTo({ page, matchingCount }, deps => {
    if (deps.matchingCount.val === 0) {
      currentPage.textContent = 'n/a';
      return;
    }

    const start = (deps.page.val * perPage) + 1;
    const end = Math.min(deps.matchingCount.val, start + perPage - 1);
    currentPage.textContent = `${start} - ${end} / ${deps.matchingCount.val}`;
  });

  const visibleItems = Reactive.from({ matchingItems, page }, deps => {
    const start = deps.page.val * perPage;
    return deps.matchingItems.val.slice(start, start + perPage);
  });

  return {
    page,
    visibleItems,
    controls: <p style='display:flex; gap:1em; align-items:baseline'>
      {prevButton} {currentPage} {nextButton}
    </p> as HTMLParagraphElement,
  };
}
