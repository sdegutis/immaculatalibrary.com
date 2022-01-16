import { data } from "./d";

const html = <a href="hi" style="" className="">in <>yes</>
  <b>hi</b>
</a>;
export default () => html;

console.log(__dir.parent!.files['bootstrapper.html']!.buffer.toString('utf8'));
console.log(__dir.root.subdirs['data']!.files['test1.txt']!.buffer.toString('utf8'));

const f = __dir.root.subdirs['data']!.files['test1.txt']!;

f.replace(Buffer.from('hello world!\n\nso cool'));

console.log(data());
