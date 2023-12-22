import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

// import schemas
import shortenBodySchema from '../schema/shorten';

export interface ShortenControllerOptions {
  tablename: string;
}

export default function shortenController(
  fastify: FastifyInstance,
  options: ShortenControllerOptions,
  done: () => void,
) {
  fastify.post('/shorten', { schema: shortenBodySchema }, async (request: FastifyRequest, reply: FastifyReply) => {
    const { originalUrl, shortenSlug } = request.body as {
      originalUrl: string;
      shortenSlug?: string;
    };

    let slug = shortenSlug;
    if (!slug) {
      // TODO: refine slug generation
      slug = Math.random().toString(36).substring(2, 7);
    }

    // check if slug exists
    const result: { slug: string } | undefined = await fastify.sqlite.get(`SELECT slug FROM ${options.tablename} WHERE slug = ?`, [slug]);

    // if resData exists, return 409
    if (result) {
      return reply.code(409).send({ error: 'Please use different slug' });
    }

    // if resData doesn't exist, insert into database
    await fastify.sqlite.run(
      `INSERT INTO ${options.tablename} (slug, original_url) VALUES (?, ?)`,
      [slug, originalUrl],
    );

    // return shortenURL
    return reply.send({ shortenUrl: `${fastify.listeningOrigin}/${slug}` });
  });

  done();
}
