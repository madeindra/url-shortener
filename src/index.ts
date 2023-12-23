// import modules
import Fastify from 'fastify';
import { fastifyStatic } from '@fastify/static';
import { fastifyView } from '@fastify/view';
import { Eta } from 'eta';
import path from 'path';

// import plugins
import sqlitePlugin from './utils/database';

// import utilities
import {
  getDbFilename, getDbTable, getHost, getPort,
} from './utils/env';

// import controllers
import homepageController from './controllers/homepage';
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

  // register static files for homepage assets
  await fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/',
  });

  // register template engine
  await fastify.register(fastifyView, {
    // eslint-disable-next-line
    engine: { eta: new Eta() },
    templates: path.join(__dirname, 'templates'),
  });

  // register controllers
  await fastify.register(homepageController);
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
