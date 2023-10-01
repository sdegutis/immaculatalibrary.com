import siteDir from './site/';

const out = siteDir.clone();

console.time('Building views');
renderDynamic(out);
const sitemap = require('/site/sitemap.xml.tsx').default(out) as JSX.Element;
out.createFile('sitemap.xml', sitemap.stringify());
console.timeEnd('Building views');

export default out;


function renderDynamic(dir: FsDir) {
  for (const subdir of dir.dirs) {
    renderDynamic(subdir);
  }

  for (const file of dir.files) {
    if (file.name.endsWith('.tsx')) {
      const exported = require('/site' + file.path).default;
      dir.delete(file);

      if (file.name === 'sitemap.xml.tsx') continue;

      if (Array.isArray(exported)) {
        for (const [name, jsx] of exported) {
          dir.createFile(name, (jsx as JSX.Element).stringify());
        }
      }
      else {
        dir.createFile(file.name.slice(0, -4), (exported as JSX.Element).stringify());
      }
    }
  }
}
