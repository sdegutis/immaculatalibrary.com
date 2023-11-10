import { FadeIn } from "../components/fadein.js";
import { Reactive, reactTo } from "./reactive.js";
import { sleep } from "./util.js";

await sleep(1);

const items = new Reactive<Item[]>([]);
const filter = new Reactive('all');

const List: JSX.Component<{ items: Reactive<Item[]> }> = ({ items }) => {
  const container = <ul /> as HTMLUListElement;
  reflectChildren(items, container, (item: Item) => item.li);
  return container;
};

class Item {

  done = false;
  li;

  constructor(public text: string, filter: Reactive<string>) {
    const span = <span>{text}</span> as HTMLSpanElement;

    span.textContent = text;

    this.li = (
      <FadeIn>
        <li
          style='cursor:pointer'
          onclick={() => {
            this.done = !this.done;
            span.style.textDecoration = this.done ? 'line-through' : '';
            span.style.opacity = this.done ? '0.5' : '';
          }}
        >
          <input type='checkbox' />
          {span}
        </li>
      </FadeIn>
    ) as HTMLDivElement;

    reactTo({ filter }, deps => {
      if (filter.val === 'all') this.li.hidden = false;
      else if (filter.val === 'done') this.li.hidden = !this.done;
      else if (filter.val === 'left') this.li.hidden = this.done;
    });
  }

  remove() {
    this.li.remove();
  }

}

const Counter: JSX.Component<{ items: Reactive<Item[]>, filter: 'all' | 'done' | 'left' }> = ({ items, filter }) => {
  const span = <span /> as HTMLSpanElement;
  reactTo({ items }, deps => {
    const items = deps.items.val.filter(item => {
      if (filter === 'done') return item.done;
      if (filter === 'left') return !item.done;
      return true;
    }
    );
    span.textContent = items.length.toFixed();
  });
  return span;
};

document.getElementById('root')!.replaceChildren(<>
  <FadeIn>
    <h1>Todo</h1>
    <p>
      <input
        autofocus
        onkeydown={function (this: HTMLInputElement, e: KeyboardEvent) {
          if (e.key === 'Enter') {
            const item = new Item(this.value.trim(), filter);
            items.set([...items.val, item]);
            this.value = '';
          }
        }}
      />
    </p>
    <p>
      {Object.entries({
        all: 'All',
        done: 'Done',
        left: 'Remaining',
      }).map(([val, name]) => (
        <label>
          <input
            type='radio'
            name='filter'
            onclick={() => filter.set(val)}
            checked={val === 'all'}
          /> {name} (<Counter items={items} filter={val as any} />)
        </label>
      ))}
    </p>
    <List items={items} />
    <p>
      <button onclick={(e: Event) => {
        e.preventDefault();
        items.set(items.val.filter(item => !item.done));
      }}>Clear done</button>
    </p>

    <h2>Source code</h2>
    <ul>
      <li><a href="https://github.com/sdegutis/immaculatalibrary.com/blob/main/site/todo.html.tsx">SSG-side source</a></li>
      <li><a href="https://github.com/sdegutis/immaculatalibrary.com/blob/main/site/scripts/todo.tsx">Client-side source</a></li>
    </ul>
  </FadeIn>
</>);

function reflectChildren<T extends C[], C>(
  items: Reactive<T>,
  container: HTMLElement,
  getView: (child: C) => HTMLElement,
) {
  const knownChildren = new Set<C>();

  reactTo({ items }, deps => {
    const adding = deps.items.val.filter(item => !knownChildren.has(item));
    const removing = [...knownChildren].filter(item => !deps.items.val.includes(item));

    for (const item of adding) {
      container.append(getView(item));
      knownChildren.add(item);
    }

    for (const item of removing) {
      getView(item).remove();
      knownChildren.delete(item);
    }
  });
}
