const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Admin API",
      version: "1.0.0",
      description: "Admin yönetimi için API dokümantasyonu",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // sadece bilgilendirme
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
        {
          name: "Admin",
          description: "Admin işlemleri",
        },
        {
          name: "Rooms",
          description: "Oda işlemleri",
        },
        {
          name: "Search",
          description: "Otel arama işlemleri",
        },
      ],      
  },
  apis: ["./routes/*.js"],
};
 
const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
