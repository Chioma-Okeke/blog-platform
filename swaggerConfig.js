const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Blog API",
            version: "1.0.0",
            description: "API documentation for the Blog Application",
        },
        servers: [
            {
                url: "https://blog-platform-dvqd.onrender.com/api",
                description: "Production server",
            },
            {
                url: "http://localhost:5000/api",
                description: "Local development server",
            },
        ],
    },
    apis: ["./router/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
