'use strict'

const PORT = 8080;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = require('./covida-db');
const data = require('./igdb-data');
const webApi = require('./covida-web-api');
const services = require('./covida-services');
webApi(app, services);

// listening on port 8080
app.listen(8080, () => console.log(`Listening at http://localhost:${PORT}`))

