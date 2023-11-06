import { jsxToElement } from "./jsx-nodes.js";
import { Reactive } from "./reactive.js";

export interface SearchFilter<T> {
  source: Reactive<any>;
  matches: (data: T) => boolean,
}

const NotFound: JSX.Component<{ visibleCount: Reactive<number> }> = ({
  visibleCount,
}) => {
  const notFound = jsxToElement<HTMLElement>(<em>No results</em>);
  reactTo({ visibleCount }, deps => {
    notFound.hidden = deps.visibleCount.val !== 0;
  });
  return <>{notFound}</>;
}

function LiveItem<T>({ Item, visibleItems, item }: {
  Item: JSX.Component<{ item: T }>,
  visibleItems: Reactive<T[]>,
  item: T,
}) {
  const element = jsxToElement<HTMLLIElement>(<Item item={item} />);

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
  const page = new Reactive(0);

  const matchingCount = Reactive.from({ matchingItems }, deps => deps.matchingItems.val.length);
  const visibleItems = Reactive.from({
    matchingItems,
    page
  }, deps => {
    const start = deps.page.val * perPage;
    return deps.matchingItems.val.slice(start, start + perPage);
  });

  const highestPage = Reactive.from({
    matchingItems,
  }, (deps) => {
    return Math.max(0, Math.floor((deps.matchingItems.val.length - 1) / perPage));
  });

  const prevButton = jsxToElement<HTMLButtonElement>(<button
    style='width:2em'
    onclick={(e: Event) => {
      e.preventDefault();
      page.set(Math.max(0, page.val - 1));
    }}
  >&lsaquo;</button>);

  const nextButton = jsxToElement<HTMLButtonElement>(<button
    style='width:2em'
    onclick={(e: Event) => {
      e.preventDefault();
      page.set(Math.min(highestPage.val, page.val + 1));
    }}
  >&rsaquo;</button>);

  reactTo({ page, highestPage }, deps => {
    nextButton.toggleAttribute('disabled', deps.page.val === deps.highestPage.val);
  });

  reactTo({ page }, deps => {
    prevButton.toggleAttribute('disabled', deps.page.val === 0);
  });

  const currentPage = jsxToElement(<span style='min-width:7em; text-align:center' />);
  reactTo({ page, matchingCount }, deps => {
    if (deps.matchingCount.val === 0) {
      currentPage.textContent = 'n/a';
      return;
    }

    const start = (deps.page.val * perPage) + 1;
    const end = Math.min(deps.matchingCount.val, start + perPage - 1);
    currentPage.textContent = `${start} - ${end}`;
  });

  const results = jsxToElement(<>
    <p style='display:flex; gap:1em; align-items:baseline'>{prevButton} {currentPage} {nextButton}</p>
    <NotFound visibleCount={matchingCount} />
    <ul>
      {data.map(item => jsxToElement(
        <LiveItem item={item} visibleItems={visibleItems} Item={Item} />
      ))}
    </ul>
  </>);

  const updateMatchingItems = () => {
    matchingItems.set(data.filter(item => filters.every(filter => filter.matches(item))));
  };

  page.onChange(updateMatchingItems);

  for (const filter of filters) {
    filter.source.onChange(() => {
      page.set(0);
      updateMatchingItems();
    });
  }

  return { results, matchingCount };
}

function reactTo<T extends { [key: string]: Reactive<any> }>(
  deps: T,
  fn: (deps: T) => void,
) {
  for (const dep of Object.values(deps)) {
    dep.onChange(() => fn(deps));
  }
}
