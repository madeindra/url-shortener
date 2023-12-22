import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export default function redirectController(
  fastify: FastifyInstance,
  opts: unknown,
  done: () => void,
) {
  fastify.get('/:slug([a-zA-Z0-9]{5,})', (request: FastifyRequest, reply: FastifyReply) => {
    const { slug } = request.params as { slug: string };

    return reply.redirect(301, `https://google.com/${slug}`);
  });

  done();
}
