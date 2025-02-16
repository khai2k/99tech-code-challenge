import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Management API",
      version: "1.0.0",
      description: "A simple REST API for managing books",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.ts"], // Path to the API routes
};

export const specs = swaggerJsdoc(options);
