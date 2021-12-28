import 'source-map-support/register';
import * as imlib from './imlib';

main();
async function main() {

  const oldDb = new imlib.JsonFileDatabase('data.json');
  const newDb = new imlib.JsonDirDatabase('data');

  const oldItems = await oldDb.load();
  const newItems = await newDb.load();

  for (const [key, val] of oldItems) {
    newItems.set(key, val);
  }

  newDb.save(newItems.keys());

}
