'use strict'

const serv  = require('./covida-services.js');

function getGamesByName(req, res) { //Implementation of the route to get a specific game by name
    console.log("Get A Specific Game By Name")
    serv.getGamesByName(req.params.game_name, (gameObj, statusCode) => processCb(gameObj, statusCode, res));
}

function getGamesById(req, res) { //Implementation of the route to get a specific game by id
    console.log("Get A Specific Game By ID")
    serv.getGamesById(req.params.game_id, (gameObj, statusCode) => processCb(gameObj, statusCode, res));
}

function createGroup(req, res) { //Implementation of the route to create a group
    console.log("Create Group")
    serv.createGroup(req.body.name, req.body.desc, (groupObj, statusCode) => processCb(groupObj, statusCode, res));
}

function listGroups(req, res) { //Implementation of the route to get all groups
    console.log("List Groups")
    serv.listGroups((groupListObj, statusCode) => processCb(groupListObj, statusCode, res));
}

function getGroupByName(req, res) { //Implementation of the route to get a specific group
    console.log("Get A Specific Group")
    serv.getGroupByName(req.params.group_name, (groupObj, statusCode) => processCb(groupObj, statusCode, res));
}

function addGameByNameToGroup(req, res) { //Implementation of the route to add a game by name to a specific group
    console.log("Add Game to Group")        
    serv.addGameByNameToGroup(req.params.game_name, req.params.group_name, (groupObj, statusCode) => processCb(groupObj, statusCode, res))
}

function addGameByIdToGroup(req, res) { //Implementation of the route to add a game by id to a specific group
    console.log("Add Game to Group")        
    serv.addGameByIdToGroup(req.params.game_id, req.params.group_name, (groupObj, statusCode) => processCb(groupObj, statusCode, res))
}

function getRatingsFromGames(req,res) { //Implementation of the route to get a game between the given interval of values
    console.log("Get Ratings From Games From Group")
    serv.getRatingsFromGames(req.params.group_name, req.params.max, req.params.min, (gameObj, statusCode) => processCb(gameObj, statusCode, res));
}

function editGroup(req, res) { //Implementation of the route to update a specific group
    console.log("Edit Group")
    serv.editGroup(req.params.group_name, req.body.name, req.body.desc, (groupObj, statusCode) => processCb(groupObj, statusCode, res))
}

function removeGameById(req, res) { //Implementation of the route to delete a specific game from a group
    console.log("Remove Game By ID")
    serv.removeGameById(req.params.group_name, req.body.game_id, (groupObj, statusCode) => processCb(groupObj, statusCode, res))
}

//Process a callback
function processCb(statusCode, obj, res) {
    res.statusCode = statusCode;
    res.json(obj) //send the response in json
}

module.exports = {
    getGamesByName: getGamesByName,
    getGamesById: getGamesById,
    
    createGroup: createGroup,
    listGroups: listGroups,
    getGroupByName: getGroupByName,
    addGameByNameToGroup: addGameByNameToGroup,
    addGameByIdToGroup: addGameByIdToGroup,
    
    getRatingsFromGames: getRatingsFromGames,
    editGroup: editGroup,
    removeGameById: removeGameById
}
