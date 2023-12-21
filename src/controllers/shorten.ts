import { FastifyReply, FastifyRequest } from 'fastify';

export default (req: FastifyRequest, res: FastifyReply) => {
  const { originalUrl, customPath } = req.body as {
    originalUrl: string;
    customPath?: string;
  };

  return res.send({ originalUrl, customPath });
};
