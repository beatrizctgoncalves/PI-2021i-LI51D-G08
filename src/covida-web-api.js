'use strict'

const serv  = require('./covida-services.js');

function getGamesWithName(req, res) { //Implementation of the route to get a specific game
    console.log("Get A Specific Game")
    serv.getGamesWithName(req.params.game_name, processGetGamesWithName);

    function processGetGamesWithName(err, gamesObj) {
        if(gamesObj.error) {
            res.statusCode = 404;
        } else {
            res.statusCode = 200;
        }
        res.end(gamesObj)
    }
}

function createGroup(req, res) { //Implementation of the route to create a group
    console.log("Create Group")
    serv.createGroup(req.body.name, req.body.desc, processCreateGroup);

    function processCreateGroup(err, createdMessageObj) {
        if(createdMessageObj.error) {
            res.statusCode = 404; //Not Found
        } else {
            res.statusCode = 201;
        }
        res.end(JSON.stringify(createdMessageObj))
    } 
}

function listGroups(req, res) { //Implementation of the route to get all groups
    console.log("List Groups")
    serv.listGroups(processListGroups);

    function processListGroups(err, groupListObj) {
        if(groupListObj.error) {
            res.statusCode = 404; //Not Found
        } else {
            res.statusCode = 200 //OK
        }
        res.end(JSON.stringify(groupListObj))
    }
}

function getGroupWithName(req, res) { //Implementation of the route to get a specific group
    console.log("Get A Specific Group")
    serv.getGroupWithName(req.params.group_name, processGetGroupWithName);

    function processGetGroupWithName(err, groupObj) {
        if(groupObj.error) {
            res.statusCode = 404; //Not Found
        } else {
            res.statusCode = 200 //OK
        }
        res.end(JSON.stringify(groupObj))              
    }
}

function addGameToGroup(req, res) { //Implementation of the route to add a game to a specific group
    console.log("Add Game to Group")
            
    serv.addGameToGroup(req.params.game_name, req.params.group_name, processAddGameToGroup)
           
    function processAddGameToGroup(err, groupObj) {
        if (groupObj.error) {
            res.statusCode = 404; //Not Found
        } else {
            res.statusCode = 200;
        }
        res.end(JSON.stringify(groupObj))
    }
}

function getRatingsFromGames(req,res) { //Implementation of the route to get a game between the given interval of values
    console.log("Game From Group")
    serv.getRatingsFromGames(req.params.group_name, req.params.max, req.params.min, processGetRatingsFromGames)
            
    function processGetRatingsFromGames(err, gameObj) {
        if(gameObj.error) res.statusCode = 404;
        else res.statusCode = 205;
        res.end(gameObj)
    }
}

function editGroup(req, res) { //Implementation of the route to update a specific group
    console.log("Edit Group")
    serv.editGroup(req.params.group_name, req.body.name, req.body.desc, processEditGroup)

    function processEditGroup(err, createdMessageObj) {
        if(createdMessageObj.error) {
            res.statusCode = 404; //Forbidden
        } else {
            res.statusCode = 201;
        }
        res.end(JSON.stringify(createdMessageObj))
    } 
}

function removeGame(req, res) { //Implementation of the route to delete a specific game from a group
    console.log("Remove Game")
    serv.removeGame(req.params.group_name,req.body.game_name,processRemoveGame)

    function processRemoveGame(err, gameObj) {
        if(gameObj.error) res.statusCode = 404;
        else res.statusCode = 205;
        res.end(JSON.stringify(gameObj))
    }
}

module.exports = {
    getGamesWithName: getGamesWithName,
    
    createGroup: createGroup,
    listGroups:listGroups,
    getGroupWithName:getGroupWithName,
    addGameToGroup: addGameToGroup,
    
    getRatingsFromGames: getRatingsFromGames,
    editGroup: editGroup,
    removeGame: removeGame
}
