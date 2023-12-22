import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

// import schemas
import shortenBodySchema from '../schema/shorten';

export default function shortenController(
  fastify: FastifyInstance,
  opts: unknown,
  done: () => void,
) {
  fastify.post('/shorten', { schema: shortenBodySchema }, (request: FastifyRequest, reply: FastifyReply) => {
    const { originalUrl, customPath } = request.body as {
      originalUrl: string;
      customPath?: string;
    };

    return reply.send({ originalUrl, customPath });
  });

  done();
}
