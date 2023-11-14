import { makePaginator } from "./paginator.js";
import { Reactive, reactTo } from "./reactive.js";

export interface SearchFilter<T> {
  source: Reactive<any>;
  matches: (data: T) => boolean,
}

export function createSearch<T>({ data, searchTerm, viewForItem, filters, perPage = 7 }: {
  data: T[];
  searchTerm: Reactive<string>,
  viewForItem: (item: T, search?: string) => JSX.Element;
  filters: SearchFilter<T>[];
  perPage?: number,
}) {
  const matchingItems = new Reactive<T[]>([]);
  const paginator = makePaginator(matchingItems, perPage);
  const container = <div /> as HTMLDivElement;
  const noResults = <em>No results</em>;
  const list = <ul /> as HTMLUListElement;

  const views = new Map<T, JSX.Element>();

  reactTo({ visibleItems: paginator.visibleItems }, deps => {
    if (deps.visibleItems.val.length === 0) {
      container.replaceChildren(noResults);
    }
    else {
      list.replaceChildren(...deps.visibleItems.val.map(item => {
        if (!searchTerm.val) {
          let view = views.get(item);
          if (!view) views.set(item, view = viewForItem(item));
          return view;
        }
        else {
          return viewForItem(item, searchTerm.val);
        }
      }));
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
    <link rel='stylesheet' href='/css/components/searchlist.css' />
    {paginator.controls}
    {container}
  </>;

  return { results, matchingItems };
}

export function highlight(text: string, search?: string) {
  return <span innerHTML={highlightText(text, search)} />;
}

export function highlightText(text: string, search?: string) {
  if (!search) return text;
  return text.replace(new RegExp(`(${search})`, 'gi'), `<span class='highlight'>$1</span>`);
}
