const swaggerJSDoc = require('swagger-jsdoc');  
  
const swaggerOptions = {
  swaggerDefinition: {
      info: {
          title: 'Ipssi Api 2019',
          description: 'Ipssi Api Information',
          version: '1.0.0',
          contact: {
              name: 'Kévin Alves'
          },
      },
      servers: ["http:localhost:5000"],
      swagger: '2.0',
      host: `localhost:5000`,  
      basePath: '/api', 
      consumes: ['application/json'], 
      produces: ['application/json'],
      tags: [
        {
          "name": "Users",
          "description": "API for users in the system"
        }
      ], 
      schemes: [  
          'http',  
      ],
  },
  apis: [,'./**/api/routes/*.js'],
};
  
module.exports = {  
  spec() {  
    return swaggerJSDoc(swaggerOptions);  
  },  
};