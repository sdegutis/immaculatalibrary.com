import 'dotenv/config';
import 'source-map-support/register';
import { startServer } from './http';
import { Site } from './site';

const site = new Site();
site.restartOnSourceChanges();

startServer(process.env['BASE_URL']!, 8080, site);
