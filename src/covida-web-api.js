'use strict'

const serv  = require('./covida-services.js');

function getGamesWithName(req, res) { //Implementation of the route to get a specific game
    console.log("Get A Specific Game")
    serv.getGamesWithName(req.params.game_name, (err, gameObj) => processCb(err, gameObj, res));
}

function createGroup(req, res) { //Implementation of the route to create a group
    console.log("Create Group")
    serv.createGroup(req.body.name, req.body.desc, (err, groupObj) => processCb(err, groupObj, res));
}

function listGroups(req, res) { //Implementation of the route to get all groups
    console.log("List Groups")
    serv.listGroups((err, groupListObj) => processCb(err, groupListObj, res));
}

function getGroupWithName(req, res) { //Implementation of the route to get a specific group
    console.log("Get A Specific Group")
    serv.getGroupWithName(req.params.group_name, (err, groupObj) => processCb(err, groupObj, res));
}

function addGameToGroup(req, res) { //Implementation of the route to add a game to a specific group
    console.log("Add Game to Group")        
    serv.addGameToGroup(req.params.game_name, req.params.group_name, (err, groupObj) => processCb(err, groupObj, res))
}

function getRatingsFromGames(req,res) { //Implementation of the route to get a game between the given interval of values
    console.log("Get Ratings From Games From Group")
    serv.getRatingsFromGames(req.params.group_name, req.params.max, req.params.min, (err, gameObj) => processCb(err, gameObj, res));
}

function editGroup(req, res) { //Implementation of the route to update a specific group
    console.log("Edit Group")
    serv.editGroup(req.params.group_name, req.body.name, req.body.desc, (err, groupObj) => processCb(err, groupObj, res))
}

function removeGame(req, res) { //Implementation of the route to delete a specific game from a group
    console.log("Remove Game")
    serv.removeGame(req.params.group_name, req.body.game_name, (err, groupObj) => processCb(err, groupObj, res))
}

//Process a callback
function processCb(err, obj, res) {
    if(obj.error) {
        res.statusCode = 404; //Not Found
    } else {
        res.statusCode = 200; //OK
    }
    res.json(obj) //send the response in json
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
