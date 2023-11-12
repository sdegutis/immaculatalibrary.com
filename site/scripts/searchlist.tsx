import { makePaginator } from "./paginator.js";
import { Reactive, reactTo } from "./reactive.js";

export interface SearchFilter<T> {
  source: Reactive<any>;
  matches: (data: T) => boolean,
}

const NotFound: JSX.Component<{ matchingItems: Reactive<any[]> }> = ({
  matchingItems,
}) => {
  const notFound = <em>No results</em> as HTMLElement;
  reactTo({ matchingItems }, deps => {
    notFound.hidden = deps.matchingItems.val.length !== 0;
  });
  return <>{notFound}</>;
}

function LiveItem<T>({ Item, visibleItems, item }: {
  Item: JSX.Component<{ item: T }>,
  visibleItems: Reactive<T[]>,
  item: T,
}) {
  const element = <Item item={item} /> as HTMLLIElement;

  reactTo({ visibleItems }, deps => {
    element.hidden = !deps.visibleItems.val.includes(item);
  });

  return <>{element}</>;
}

export function createSearch<T>({ data, Item, filters, perPage = 7 }: {
  data: T[];
  Item: JSX.Component<{ item: T }>;
  filters: SearchFilter<T>[];
  perPage?: number,
}) {
  const matchingItems = new Reactive<T[]>([]);

  const paginator = makePaginator(matchingItems, perPage);

  const results = <>
    {paginator.controls}
    <NotFound matchingItems={matchingItems} />
    <ul>
      {data.map(item =>
        <LiveItem item={item} visibleItems={paginator.visibleItems} Item={Item} />
      )}
    </ul>
  </>;

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

  return { results, matchingItems };
}
