const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    apis: ['.routes/*.js'],
    basePath: '/',
    swaggerDefinition: {
        info: {
            title: 'Ipssi Api 2019',
            description: 'Ipssi Api Information',
            version: '1.0.0',
            contact: {
                name: 'Kévin Alves'
            },
            servers: ["http:localhost:5000"],
            swagger: '2.0',
        },
    },
};

const specs = swaggerJsdoc(swaggerOptions);

export default specs;