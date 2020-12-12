'use strict'

const express = require('express'); //Import the express module
const app = express(); //Create an Express application

const bodyParser = require('body-parser'); //Import the body-parser module 
app.use(bodyParser.json()); //Parse application/json
app.use(bodyParser.urlencoded({extended: true})); //Parse application/x-www-form-urlencoded

const webApi = require('./covida-web-api.js'); //Import the covida-web-api

const PORT = 8080;
app.listen(8080, () => console.log(`Listening at http://localhost:${PORT}`)) //Listening on port 8080

app.get('/games/:game_id', webApi.getGamesById); //Get a specific game by id
app.get('/games/:game_name', webApi.getGamesByName); //Get a specific game by name

app.post('/groups', webApi.createGroup); //Post a group in the database
app.get('/groups', webApi.listGroups); //Get all groups
app.get('/groups/:group_id', webApi.getGroupByID); //Get a specific group
app.put('/groups/:group_id', webApi.editGroup); //Update a specific group
app.delete('/groups/:group_id', webApi.removeGroup); //Remove a specific group by id

app.get('/groups/:group_id/games/:min&:max', webApi.getRatingsFromGames); //Get a game between the given interval of values
app.put(`/groups/:group_id/games/:game_id`, webApi.addGameByIdToGroup); //Add a specific game by id to a group
app.delete('/groups/:group_id/games/:game_id', webApi.removeGameById); //Remove a specific game by id from a group

