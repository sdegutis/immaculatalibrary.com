import chokidar from 'chokidar';
import 'dotenv/config';
import 'source-map-support/register';
import { startServer } from './http';
import { Site } from './site';

const formatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: '2-digit',
  year: 'numeric',
  hour12: true,
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h12',
  fractionalSecondDigits: 3,
} as Intl.DateTimeFormatOptions & { fractionalSecondDigits?: 0 | 1 | 2 | 3 });

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
