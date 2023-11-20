import { Reactive, reactTo } from "./reactive.js";

const arrowStyle = 'stroke:currentColor; stroke-linecap:round; stroke-linejoin:round; stroke-width:2px';
const leftArrow = <svg viewBox="0 0 16 16" height='10' style={arrowStyle}><path d="M11 2 L5 8 11 14"></path></svg>;
const rightArrow = <svg viewBox="0 0 16 16" height='10' style={arrowStyle}><path d="M5 2 L11 8 5 14"></path></svg>;

export function makePaginator<T>(
  items: Reactive<T[]>,
  perPage: number,
) {
  const page = new Reactive(0);

  const highestPage = Reactive.from({ items, }, (deps) =>
    Math.max(0, Math.floor((deps.items.val.length - 1) / perPage))
  );

  const count = Reactive.from({ items }, deps => deps.items.val.length);

  const prevButton = <button
    style='width:2em'
    onclick={(e: Event) => {
      e.preventDefault();
      page.set(Math.max(0, page.val - 1));
    }}
  >{leftArrow}</button> as HTMLButtonElement;

  const nextButton = <button
    style='width:2em'
    onclick={(e: Event) => {
      e.preventDefault();
      page.set(Math.min(highestPage.val, page.val + 1));
    }}
  >{rightArrow}</button> as HTMLButtonElement;

  reactTo({ page, highestPage }, deps => {
    nextButton.toggleAttribute('disabled', deps.page.val === deps.highestPage.val);
  });

  reactTo({ page }, deps => {
    prevButton.toggleAttribute('disabled', deps.page.val === 0);
  });

  const currentPage = <span style='min-width:7em; text-align:center' /> as HTMLSpanElement;
  reactTo({ page, count }, deps => {
    if (deps.count.val === 0) {
      currentPage.textContent = 'n/a';
      return;
    }

    const start = (deps.page.val * perPage) + 1;
    const end = Math.min(deps.count.val, start + perPage - 1);
    currentPage.textContent = `${start} - ${end} / ${deps.count.val}`;
  });

  const visibleItems = Reactive.from({ items, page }, deps => {
    const start = deps.page.val * perPage;
    return deps.items.val.slice(start, start + perPage);
  });

  return {
    page,
    visibleItems,
    controls: <p style='display:flex; gap:1em; align-items:baseline'>
      {prevButton} {currentPage} {nextButton}
    </p> as HTMLParagraphElement,
  };
}
