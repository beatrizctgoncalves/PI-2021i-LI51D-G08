'use strict'

const express = require('express'); //Import the express module
const app = express(); //Create an Express application

const bodyParser = require('body-parser'); //Import the body-parser module 
app.use(bodyParser.json()); //Parse application/json
app.use(bodyParser.urlencoded({extended: true})); //Parse application/x-www-form-urlencoded

const webApiCreator = require('./covida-web-api') //Import the covida-web-api
const servicesCreator = require('./covida-services')
const data = require('./igdb-data')
const db = require('./covida-db')

const services = servicesCreator(data, db)
webApiCreator(app, services)

const PORT = 8080;
app.listen(8080, () => console.log(`Listening at http://localhost:${PORT}`)) //Listening on port 8080


