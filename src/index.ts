// import modules
import Fastify from 'fastify';
import sqlitePlugin from './utils/database';

// import utilities
import { getDbUri, getHost, getPort } from './utils/env';

// import controllers
import shortenController from './controllers/shorten';
import redirectController from './controllers/redirect';

// import schemas
import shortenBodySchema from './schema/shorten';

// fastify initialization
const fastify = Fastify();

// configs initialization
const PORT: number = getPort();
const HOST: string = getHost();
const DB_URI: string = getDbUri();

// register plugins
async function init() {
  await fastify.register(sqlitePlugin, { filename: DB_URI });
  await fastify.ready();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
init();

// register routes
fastify.post('/shorten', { schema: shortenBodySchema }, shortenController);
fastify.get('/:slug([a-zA-Z0-9]{5,})', redirectController);

// start sever
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: HOST });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
