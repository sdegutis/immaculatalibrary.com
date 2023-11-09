import { FadeIn } from "../components/fadein.js";
import { Reactive, reactTo } from "./reactive.js";
import { sleep } from "./util.js";

await sleep(1);

let items: Item[] = [];

const filter = new Reactive('all');

const list = <ul /> as HTMLUListElement;

class Item {

  done = false;
  li;

  constructor(public text: string, filter: Reactive<string>) {
    const span = <span>{text}</span> as HTMLSpanElement;

    span.textContent = text;

    this.li = <li
      style='cursor:pointer'
      onclick={() => {
        this.done = !this.done;
        span.style.textDecoration = this.done ? 'line-through' : '';
        span.style.opacity = this.done ? '0.5' : '';
      }}
    >
      <input type='checkbox' />
      {span}
    </li> as HTMLLIElement;

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

const addItem = (text: string, filter: Reactive<string>) => {
  const item = new Item(text, filter);
  items.push(item);
  list.append(item.li);
};

function clearDone(e: Event) {
  e.preventDefault();

  for (const item of items) {
    if (item.done) {
      item.remove();
    }
  }

  items = items.filter(item => !item.done);
}

document.getElementById('root')!.replaceChildren(<>
  <FadeIn>
    <h1>Todo</h1>
    <p>
      <input
        autofocus
        onkeydown={function (this: HTMLInputElement, e: KeyboardEvent) {
          if (e.key === 'Enter') {
            addItem(this.value.trim(), filter);
            this.value = '';
          }
        }}
      />
    </p>
    <p>
      <label><input type='radio' name='filter' onclick={() => filter.set('all')} checked /> All</label>
      <label><input type='radio' name='filter' onclick={() => filter.set('done')} /> Done</label>
      <label><input type='radio' name='filter' onclick={() => filter.set('left')} /> Remainder</label>
    </p>
    {list}
    <p>
      <button onclick={clearDone}>Clear done</button>
    </p>
  </FadeIn>
</>);
