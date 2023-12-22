// import modules
import Fastify from 'fastify';
import sqlitePlugin from './utils/database';

// import utilities
import {
  getDbFilename, getDbTable, getHost, getPort,
} from './utils/env';

// import controllers
import shortenController from './controllers/shorten';
import redirectController from './controllers/redirect';

// fastify initialization
const fastify = Fastify({ logger: true });

// configs initialization
const PORT: number = getPort();
const HOST: string = getHost();
const DB_FILENAME: string = getDbFilename();
const DB_TABLENAME: string = getDbTable();

async function init() {
  // register plugins
  await fastify.register(sqlitePlugin, { filename: DB_FILENAME, tablename: DB_TABLENAME });

  // register controllers
  await fastify.register(shortenController, { tablename: DB_TABLENAME });
  await fastify.register(redirectController, { tablename: DB_TABLENAME });

  // initialize fastify
  await fastify.ready();
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
init();

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
