import { makePaginator } from "./paginator.js";
import { Reactive, reactTo } from "./reactive.js";

export interface SearchFilter<T> {
  source: Reactive<any>;
  matches: (data: T) => boolean,
}

export function createSearch<T>({ data, viewForItem, filters, perPage = 7 }: {
  data: T[];
  viewForItem: (item: T) => JSX.Element;
  filters: SearchFilter<T>[];
  perPage?: number,
}) {
  const matchingItems = new Reactive<T[]>([]);
  const paginator = makePaginator(matchingItems, perPage);
  const container = <div /> as HTMLDivElement;
  const noResults = <em>No results</em>;
  const list = <ul /> as HTMLUListElement;

  reactTo({ visibleItems: paginator.visibleItems }, deps => {
    if (deps.visibleItems.val.length === 0) {
      container.replaceChildren(noResults);
    }
    else {
      list.replaceChildren(...deps.visibleItems.val.map(viewForItem));
      container.replaceChildren(list);
    }
  });

  const updateMatchingItems = () => {
    matchingItems.set(data.filter(item => filters.every(filter => filter.matches(item))));
  };

  paginator.page.onChange(updateMatchingItems);

  for (const filter of filters) {
    filter.source.onChange(() => {
      paginator.page.set(0);
      updateMatchingItems();
    });
  }

  const results = <>
    {paginator.controls}
    {container}
  </>;

  return { results, matchingItems };
}
