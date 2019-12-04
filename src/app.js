const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express(),
    hostname = '127.0.0.1',
    User = require('./api/models/userModel');

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const port = process.env.PORT || 5000;

// Extented: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    apis: ['.routes/*.js'],
    basePath: '/',
    swaggerDefinition: {
        info: {
            title: 'Ipssi Api 2019',
            description: 'Ipssi Api Information',
            version: '1.0.0',
            contact: {
                name: 'Awasome Dev'
            },
            servers: ["http:localhost:5000"],
            swagger: '2.0',
        },
    },
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ipssi2019', {useUnifiedTopology: true, useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const routes = require('./api/routes/userRoutes');
routes(app);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});