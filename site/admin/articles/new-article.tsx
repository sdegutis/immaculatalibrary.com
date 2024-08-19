import * as kv from 'idb-keyval';
import { slugify } from '../util/helpers.js';

const title = document.querySelector<HTMLInputElement>('[name=title]')!;
const slug = document.querySelector<HTMLInputElement>('[name=slug]')!;
const textarea = document.querySelector<HTMLTextAreaElement>('[name=content]')!;

const saved = await kv.get('newarticle');
if (saved) textarea.value = saved;

const save = throttle(300, () => {
  kv.set('newarticle', textarea.value);
});

title.oninput = () => slug.value = slugify(title.value);
textarea.oninput = save;

function throttle(ms: number, fn: () => void) {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, ms);
  };
}
