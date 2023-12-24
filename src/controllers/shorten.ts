import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

// import schemas
import shortenBodySchema from '../schema/shorten';
import { generateSlug } from '../utils/slug';

export interface ShortenControllerOptions {
  tablename: string;
}

export default function shortenController(
  fastify: FastifyInstance,
  options: ShortenControllerOptions,
  done: () => void,
) {
  fastify.post('/shorten', { schema: shortenBodySchema }, async (request: FastifyRequest, reply: FastifyReply) => {
    const { originalUrl, customSlug } = request.body as {
      originalUrl: string;
      customSlug?: string;
    };

    let slug = customSlug;
    if (!slug) {
      slug = generateSlug(5);
    }

    // check if slug exists
    const result: { slug: string } | undefined = await fastify.sqlite.get(`SELECT slug FROM ${options.tablename} WHERE slug = ?`, [slug]);

    // if resData exists, return 409
    if (result) {
      return reply.code(409).send({ error: 'Conflict', message: 'Please use different slug' });
    }

    // if resData doesn't exist, insert into database
    await fastify.sqlite.run(
      `INSERT INTO ${options.tablename} (slug, original_url) VALUES (?, ?)`,
      [slug, originalUrl],
    );

    // return shortUrl
    return reply.send({ shortUrl: `${request.hostname}/${slug}` });
  });

  done();
}
