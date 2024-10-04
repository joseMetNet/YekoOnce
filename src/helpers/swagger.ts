import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Yeko Club Once API',
      version: '1.0.0',
      description: 'API documentation for Yeko Club Once',
    },
    servers: [
      {
        url: 'http://localhost:8080/yekoclubonce',
        description: 'Local server',
      },
      {
        url: 'https://yekocluboncebackend.azurewebsites.net/yekoclubonce',
        description: 'Production server',
    },  
    ],
    components: {
      schemas: {
        Member: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            member_id: { type: 'integer' },
            code: { type: 'integer' },
            fullname: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
            phone: { type: 'string' },
            gender: { type: 'string' },
            identification: { type: 'string' },
            birthdate: { type: 'string', format: 'date' },
            preferred_department_id: { type: 'string' },
            activation_ip: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        Membership: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            public_id: { type: 'string' },
            member_id: { type: 'integer' },
            card_id: { type: 'integer' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default setupSwagger;
