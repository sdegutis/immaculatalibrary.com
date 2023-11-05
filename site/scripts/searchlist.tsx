import { jsxToElement } from "./jsx-nodes.js";
import { Reactive } from "./reactive.js";

export interface SearchFilter<T> {
  source: Reactive<any>;
  matches: (data: T) => boolean,
}

const NotFound: JSX.Component<{ visibleCount: Reactive<number> }> = ({ visibleCount }, children) => {
  const notFound = jsxToElement(<em>No results</em>) as HTMLElement;
  visibleCount.onChange(() => {
    notFound.hidden = visibleCount.val !== 0;
  });
  return <>{notFound}</>;
}

function LiveItem<T>({ Item, visibleItems, item }: {
  Item: JSX.Component<{ item: T }>,
  visibleItems: Reactive<T[]>,
  item: T,
}) {
  const element = jsxToElement(<Item item={item} />) as HTMLLIElement;

  visibleItems.onChange(() => {
    element.hidden = !visibleItems.val.includes(item);
  });

  return <>{element}</>;
}

export function createSearch<T>({ data, Item, filters }: {
  data: T[];
  Item: JSX.Component<{ item: T }>;
  filters: SearchFilter<T>[];
}) {
  const matchingItems = new Reactive<T[]>([]);
  const matchingCount = new Reactive(0);

  matchingItems.onChange(() => matchingCount.set(matchingItems.val.length));

  const results = jsxToElement(<>
    <NotFound visibleCount={matchingCount} />
    <ul>
      {data.map(item => jsxToElement(
        <LiveItem item={item} visibleItems={matchingItems} Item={Item} />
      ))}
    </ul>
  </>);

  const search = () => {
    matchingItems.set(data.filter(item => filters.every(filter => filter.matches(item))));
  };

  for (const filter of filters) {
    filter.source.onChange(search);
  }

  return { results, matchingCount, search };
}
