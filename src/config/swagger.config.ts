import { SwaggerDefinition, Options } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Customer Feedback Management System API",
    version: "1.0.0",
    description: "API for managing customer feedback and admin functionalities",
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options: Options = {
  swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

export default options;
