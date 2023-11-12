import { makePaginator } from "./paginator.js";
import { Reactive, reactTo } from "./reactive.js";

for (const div of document.querySelectorAll<HTMLElement>('[data-paginate]')) {
  enablePagination(div, (+div.dataset["paginate"]!));
}

function enablePagination(parent: HTMLElement, perPage: number) {
  const items = [...parent.children] as HTMLElement[];

  const matchingItems = Reactive.from({}, () => items);

  const paginator = makePaginator(matchingItems, perPage);

  reactTo({ visibleItems: paginator.visibleItems }, deps => {
    for (const item of items) {
      item.hidden = !deps.visibleItems.val.includes(item);
    }
  });

  parent.insertAdjacentElement('afterbegin', paginator.controls);
}
