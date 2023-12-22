import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

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
      return reply.code(404).send({ error: 'Not Found' });
    }

    // TODO: validate URL before redirecting

    // if row exists, redirect to original_url
    return reply.redirect(301, result.original_url);
  });

  done();
}
