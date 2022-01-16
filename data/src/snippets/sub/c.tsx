import { data } from "./d";

export default () => <a href='hey'>in <>yes</>c!</a>;

console.log(__dir.parent.files['bootstrapper.html'].buffer.toString('utf8'));
console.log(__dir.root.subdirs['data'].files['test1.txt'].buffer.toString('utf8'));

const f = __dir.root.subdirs['data'].files['test1.txt'];

f.replace(Buffer.from('hello world!\n\nso cool'));

console.log(data());
