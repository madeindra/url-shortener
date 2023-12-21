import Fastify from 'fastify';

import shortenController from './controllers/shorten';
import redirectController from './controllers/redirect';

import shortenBodySchema from './schema/shorten';

const fastify = Fastify();

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3000;
const HOST: string = process.env.HOST ?? '0.0.0.0';

fastify.post('/shorten', { schema: shortenBodySchema }, shortenController);
fastify.get('/:slug', redirectController);

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: HOST });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// eslint-disable-next-line
start();
