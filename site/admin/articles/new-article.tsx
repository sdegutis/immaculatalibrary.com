import * as kv from 'idb-keyval';
import { slugify } from '../util/helpers.js';

const titleInput = document.querySelector<HTMLInputElement>('[name=title]')!;
const slugInput = document.querySelector<HTMLInputElement>('[name=slug]')!;
const contentInput = document.querySelector<HTMLTextAreaElement>('[name=content]')!;

const saved = await kv.get('newarticle');
if (saved) contentInput.value = saved;

const save = throttle(300, () => {
  kv.set('newarticle', contentInput.value);
});

titleInput.oninput = () => slugInput.value = slugify(titleInput.value);
contentInput.oninput = save;

function throttle(ms: number, fn: () => void) {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
}
