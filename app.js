const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express(),
    hostname = '0.0.0.0',
    User = require('./src/api/models/userModel');

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const swaggerSpec = require('./src/config/swagger.config').spec();  

require('./src/api/routes/userRoutes.js')(app);

const swaggerOptions = {  
  customSiteTitle: 'Ipssi API 2019 Documentation', 
  customCss: '.topbar { display: none }',  
};  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));  
app.get('/api-docs.json', (req, res) => {  
    res.setHeader('Content-Type', 'application/json');  
    res.status(200).json(swaggerSpec);  
}); 

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongo:27017/ipssi2019', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true,});

const routes = require('./src/api/routes/userRoutes');
routes(app);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});