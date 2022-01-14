import foo from './foo';

for (let i = 0; i < 3; i++) {
  console.log('hey world', i, foo);
}


export default function (a: number) {
  return a * 2;
}
