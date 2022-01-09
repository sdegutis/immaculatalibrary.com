const purity = require('@puritylib/purity');
const dotenv = require('dotenv');

dotenv.config();

main();
async function main() {

  const oldDb = new purity.JsonFileDatabase('data.json');
  // const newDb = new purity.S3Database('imlibv3');

  const oldItems = await oldDb.load();
  const newItems = await newDb.load();

  for (const [key, val] of oldItems) {
    newItems.set(key, val);
  }

  newDb.save(newItems.keys());
  newDb.saveIfNeeded();

}
