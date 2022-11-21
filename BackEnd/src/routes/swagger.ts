import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerRouter = express.Router();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'KUAGORA-Server',
      version: '1.0.0',
      description: 'REST API with Express',
    },
    servers: [
      { url: 'http://localhost:4000', description: '개발 서버' },
      { url: 'https://app.kuagora.com', description: '배포 서버' },
    ],
  },
  apis: ['./src/swagger/routes/*', './src/swagger/components/*'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get('/', swaggerUi.setup(swaggerSpec, { explorer: true }));

export default swaggerRouter;
