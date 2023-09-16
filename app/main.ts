import { renderElement } from './core/jsx';
import siteDir from './site/';

const out = siteDir.clone(null);
renderDynamic(out);
export default out;

function renderDynamic(dir: FsDir) {
  for (const subdir of dir.dirs) {
    renderDynamic(subdir);
  }

  for (const file of dir.files) {
    if (file.name.endsWith('.tsx')) {
      const exported = require(file.path).default;
      dir.delete(file);

      if (Array.isArray(exported)) {
        for (const [name, jsx] of exported) {
          dir.createFile(name, renderElement(jsx));
        }
      }
      else {
        dir.createFile(file.name.slice(0, -4), renderElement(exported));
      }
    }
  }
}
