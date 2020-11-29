'use strict'

const express = require('express'); //Import the express module
const app = express(); //Create an Express application

const bodyParser = require('body-parser'); //Import the body-parser module 
app.use(bodyParser.json()); //Parse application/json
app.use(bodyParser.urlencoded({extended: true})); //Parse application/x-www-form-urlencoded

const webApi = require('./covida-web-api.js'); //Import the covida-web-api

const PORT = 8080;
app.listen(8080, () => console.log(`Listening at http://localhost:${PORT}`)) //Listening on port 8080

app.get('/games/:game_name', webApi.getGamesWithName); //Get a specific game

app.post('/groups', webApi.createGroup); //Post a group in the database
app.get('/groups', webApi.listGroups); //Get all groups
app.get('/groups/:group_name', webApi.getGroupWithName); //Get a specific group
app.put('/groups/:group_name', webApi.editGroup); //Update a specific group

app.get('/groups/:group_name/games/:min&:max', webApi.getRatingsFromGames); //Get a game between the given interval of values
app.put(`/groups/:group_name/games/:game_name`, webApi.addGameToGroup); //Add a specific game to a group
app.delete('/groups/:group_name/games/:game_name', webApi.removeGame); //Remove a specific game from a group

