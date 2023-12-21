import { FastifyReply, FastifyRequest } from 'fastify';

export default (req: FastifyRequest, res: FastifyReply) => {
  const { slug } = req.params as { slug: string };

  return res.redirect(301, `https://google.com/${slug}`);
};
