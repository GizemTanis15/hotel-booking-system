const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hotel Booking API",
      version: "1.0.0",
      description: "Otel rezervasyon sistemi için API dökümantasyonu",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"], // ÖNEMLİ! Burada notificationRoutes.js dahil edilmeli
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
