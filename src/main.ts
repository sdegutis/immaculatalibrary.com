import 'dotenv/config';
import 'source-map-support/register';
import { startServer } from './http';
import { Site } from './site';

const formatter = new Intl.DateTimeFormat('en-US', {
  timeStyle: 'medium',
  dateStyle: 'short',
  // fractionalSecondDigits: 3,
});

function wrapLog(key: 'log' | 'error') {
  const realFn = console[key];
  console[key] = (...args: any) => {
    realFn(formatter.format(), '-', ...args);
  };
}

wrapLog('log');
wrapLog('error');

const site = new Site();
site.restartOnSourceChanges();

startServer(process.env['BASE_URL']!, 8080, site);
