import Fastify from 'fastify';

const fastify = Fastify();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const HOST = process.env.HOST ?? '0.0.0.0';

fastify.get('/', async (request, reply) => ({ hello: 'world' }));

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
