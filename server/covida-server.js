'use strict'

const authentication = require('./covida-auth');
const express = require('express'); //Import the express module
const app = express(); //Create an Express application
authentication.initialize(app);
app.use(express.json())
app.use(express.static("../client/dist"));

//const bodyParser = require('body-parser'); //Import the body-parser module 
//app.use(bodyParser.json()); //Parse application/json
//app.use(bodyParser.urlencoded({extended: true})); //Parse application/x-www-form-urlencoded

const webApiCreator = require('./covida-web-api') //Import the covida-web-api
const servicesCreator = require('./covida-services')
const data = require('./igdb-data')
const db = require('./covida-db')
const covidaResponses = require('./covida-responses')

const services = servicesCreator(data, db, covidaResponses)
webApiCreator(app, services)

const PORT = 8080;
app.listen(8080, () => console.log(`Listening at http://localhost:${PORT}`)) //Listening on port 8080


