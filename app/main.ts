import { renderElement } from './core/jsx';
import siteDir from './site/';

const out = siteDir.clone(null);
renderDynamic(out);
export default out;

function renderDynamic(currentDir: FsDir) {
  for (const dir of currentDir.dirs) {
    renderDynamic(dir);
  }

  for (const file of currentDir.files) {
    if (file.name.endsWith('.tsx')) {
      const exported = require(file.path).default;
      currentDir.delete(file);

      if (Array.isArray(exported)) {
        for (const [name, jsx] of exported) {
          currentDir.createFile(name, renderElement(jsx));
        }
      }
      else {
        currentDir.createFile(file.name.slice(0, -4), renderElement(exported));
      }
    }
  }
}
