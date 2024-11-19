import swaggerJsdoc , {Options} from require('swagger-jsdoc');
import swaggerUi from require('swagger-ui-express');

const options  = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger Express API',
      version: '1.0.0',
      description: 'A simple Express API with Swagger documentation',
    },
  },
  apis: ['./r'], // Path to your API routes
};

export const swagger = () => { 
    return swaggerJsdoc(options)
}

export {swaggerUi};