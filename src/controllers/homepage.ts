import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export default function homepageController(
  fastify: FastifyInstance,
  options: unknown,
  done: () => void,
) {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    // set template file name
    const templateFile = 'index.ejs';

    // send index.ejs
    return reply.view(templateFile);
  });

  done();
}
