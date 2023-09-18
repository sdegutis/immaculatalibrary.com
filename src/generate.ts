import { Site } from './site';
import fs from 'fs';

fs.mkdirSync('docs');

const site = new Site('app', 'docs');
site.build(true);
