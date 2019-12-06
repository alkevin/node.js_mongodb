# NODE.JS EXPRESS REST API
This projet is an example to make an REST API with node.js express mondodb and swagger with the latest version

## How to run the project

* at root folder :

-----------------

>  WARNING : Don't forget to `npm install` :wink:

-----------------

* start server :

`npm start`
=> will run nodemon app.js

OR

‘docker-compose up --build‘


* import collection of request in postman 

`host is in localhost:5000`

-----------------

* swagger url : :ok_hand:

http://localhost:5000/api-docs   


-----------------

ROUTES : 

/students   Lister les etudiants
* /students/:id   GET/POST  un etudiant

/speakers  Lister les professeurs
* /speakers/:id  GET/DELETE/POST/PUT  les professeurs

/lessons  Lister les leçons
* /lessons/:id  GET/DELETE/POST/PUT  les professeurs

/users  Lister les utilisateurs
* /users/:id  GET/DELETE/POST/PUT  les utilisateurs

good coding :wink:

