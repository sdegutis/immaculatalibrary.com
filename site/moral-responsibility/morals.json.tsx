import { markdown } from '../util/_helpers.js';
import { tostring } from '../util/tostring.js';
import files from './';

const file = files.find(f => f.path.endsWith('morals.md'))!;
const content = tostring(file.content).trim().replace(/\r/g, '');
export default content.split(/\n\n+/).map(s => markdown.render(s));
