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
  const PER_PAGE = 7;

  const matchingItems = new Reactive<T[]>([]);
  const page = new Reactive(0);

  const matchingCount = Reactive.from({ matchingItems }, deps => deps.matchingItems.val.length);
  const visibleItems = Reactive.from({
    matchingItems,
    page
  }, deps => {
    const start = deps.page.val * PER_PAGE;
    return deps.matchingItems.val.slice(start, start + PER_PAGE);
  });

  const highestPage = Reactive.from({
    matchingItems,
  }, (deps) => {
    return Math.max(0, Math.floor((deps.matchingItems.val.length - 1) / PER_PAGE));
  });

  const prevButton = jsxToElement(<a href='#' onclick={function (this: HTMLAnchorElement, e: Event) {
    e.preventDefault();
    page.set(Math.max(0, page.val - 1));
  }}>Previous</a>) as HTMLAnchorElement;

  const nextButton = jsxToElement(<a href='#' onclick={function (this: HTMLAnchorElement, e: Event) {
    e.preventDefault();
    page.set(Math.min(highestPage.val, page.val + 1));
  }}>Next</a>) as HTMLAnchorElement;

  const reflectNextButtonEnabled = () => {
    nextButton.toggleAttribute('disabled', page.val === highestPage.val);
  };

  highestPage.onChange(reflectNextButtonEnabled);
  page.onChange(reflectNextButtonEnabled);

  page.onChange((() => {
    prevButton.toggleAttribute('disabled', page.val === 0);
  }));

  const currentPage = jsxToElement(<span />);
  page.onChange(() => currentPage.textContent = `Page ${page.val + 1}`);

  const results = jsxToElement(<>
    <p style='display:flex; gap:1em'>{prevButton} {currentPage} {nextButton}</p>
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
