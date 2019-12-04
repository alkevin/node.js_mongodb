const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express(),
    hostname = '127.0.0.1',
    User = require('./api/models/userModel');

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const port = process.env.PORT || 5000;

const swaggerSpec = require('./config/swagger.config').spec();  

require('./api/routes/userRoutes.js')(app);

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
mongoose.connect('mongodb://localhost/ipssi2019', {useUnifiedTopology: true, useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const routes = require('./api/routes/userRoutes');
routes(app);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});