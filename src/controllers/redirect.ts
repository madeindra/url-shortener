import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { validateUrl } from '../utils/slug';

export interface RedirectControllerOptions {
  tablename: string;
}

export default function redirectController(
  fastify: FastifyInstance,
  options: RedirectControllerOptions,
  done: () => void,
) {
  fastify.get('/:slug([a-zA-Z0-9]{5,})', async (request: FastifyRequest, reply: FastifyReply) => {
    const { slug } = request.params as { slug: string };

    const result: { original_url: string } | undefined = await fastify.sqlite.get(`SELECT original_url FROM ${options.tablename} WHERE slug = ?`, [slug]);

    // if row doesn't exist, return 404
    if (!result) {
      return reply.code(404).send({ error: 'Not Found', message: 'Slug not found' });
    }

    // validate url
    const valid = validateUrl(result.original_url);
    if (!valid) {
      return reply.code(400).send({ error: 'Bad Request', message: 'Invalid URL' });
    }

    // redirect to original_url
    return reply.redirect(301, result.original_url);
  });

  done();
}
