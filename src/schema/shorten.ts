const shortenBodySchema = {
  type: 'object',
  required: ['originalUrl'],
  properties: {
    originalUrl: {
      type: 'string',
      format: 'uri',
    },
    customSlug: {
      type: 'string',
      pattern: '^[a-zA-Z0-9]{5,}$',
    },
  },
};

const schema = {
  body: shortenBodySchema,
};

export default schema;
