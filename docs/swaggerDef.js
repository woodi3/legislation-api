const { version } = require('../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Legislation API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/woodi3/legislation-api/blob/main/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api/v1`,
    },
  ],
};

module.exports = swaggerDef;
