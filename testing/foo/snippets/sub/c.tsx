import { data } from "/snippets/sub/d";

export default () => <a href='hey'>in <>yes</>c!</a>;

console.log(__dir.parent.files['bootstrapper.html'].buffer.toString('utf8'));

console.log(data());
