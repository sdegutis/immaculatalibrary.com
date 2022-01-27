import chokidar from 'chokidar';
import 'dotenv/config';
import 'source-map-support/register';
import { startServer } from './http';
import { Site } from './site';

const formatter = new Intl.DateTimeFormat('en-US', {
  timeStyle: 'medium',
  dateStyle: 'short',
  // fractionalSecondDigits: 3,
});

wrapLog('log');
wrapLog('error');

const site = new Site('app');
onFsChanges('app', 100, () => site.build());

startServer(process.env['BASE_URL']!, 8080, site);

function onFsChanges(path: string, msTimeout: number, fn: () => void) {
  let timeout: NodeJS.Timeout | null = null;
  chokidar.watch(path, { ignoreInitial: true }).on('all', (e, p) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(fn, msTimeout);
  });
}

function wrapLog(key: 'log' | 'error') {
  const realFn = console[key];
  console[key] = (...args: any) => {
    realFn(formatter.format(), '-', ...args);
  };
}
