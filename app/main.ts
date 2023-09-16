import { renderElement } from './core/jsx';
import siteDir from './site/';

const out = siteDir.clone(null);
renderDynamic(out);
export default out;

function renderDynamic(out: FsDir) {
  for (const dir of out.dirs) {
    renderDynamic(dir);
  }

  for (const file of out.files) {
    if (file.name.endsWith('.tsx')) {
      const exported = require(file.path).default;
      file.name = file.name.slice(0, -4);

      if (Array.isArray(exported)) {

      }
      else {
        file.buffer = renderElement(exported);
      }
    }
  }
}
