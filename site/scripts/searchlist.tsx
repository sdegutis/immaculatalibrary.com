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

export function createSearch<T>({ data, Item, filters, container, counter }: {
  data: T[];
  Item: JSX.Component<{ item: T }>;
  filters: SearchFilter<T>[];
  container: HTMLElement,
  counter: HTMLElement,
}) {
  const visibleItems = new Reactive<T[]>([]);
  const visibleCount = new Reactive(0);

  visibleCount.onChange(() => counter.textContent = visibleCount.val.toFixed());
  visibleItems.onChange(() => visibleCount.set(visibleItems.val.length));

  container.innerHTML = '';
  container.append(jsxToElement(<>
    <NotFound visibleCount={visibleCount} />
    <ul>
      {data.map(item => {
        const element = jsxToElement(<Item item={item} />) as HTMLLIElement;

        visibleItems.onChange(() => {
          element.hidden = !visibleItems.val.includes(item);
        });

        return element;
      })}
    </ul>
  </>));

  const search = () => {
    visibleItems.set(data.filter(item => {
      for (const filter of filters) {
        if (!filter.matches(item)) {
          return false;
        }
      }
      return true;
    }));
  };

  for (const filter of filters) {
    filter.source.onChange(search);
  }

  search();
}
