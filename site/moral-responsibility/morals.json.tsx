import { markdown } from '../util/_helpers.js';
import files from './';

const file = files.find(f => f.path.endsWith('morals.md'))!;
const content = file.content.toString('utf8').trim().replace(/\r/g, '');
export default content.split(/\n\n+/).map(s => markdown.render(s));
