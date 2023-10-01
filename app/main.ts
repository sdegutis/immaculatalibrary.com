import siteDir from './site/';

const out = siteDir.clone();

console.time('Building views');
renderDynamic(out);
out.createFile('sitemap.xml', require('/site/sitemap.xml.tsx').default(out).toString());
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
          dir.createFile(name, jsx.toString());
        }
      }
      else {
        dir.createFile(file.name.slice(0, -4), exported.toString());
      }
    }
  }
}
