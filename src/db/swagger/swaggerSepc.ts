import swaggerJSDoc from 'swagger-jsdoc'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Employee Timeline API',
      version: '1.0.0',
      description: 'API documentation for the Employee Timeline Express app',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./src/routes/*.ts']
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec
