'use strict'

const serv  = require('./covida-services.js');

//Handle multiple asynchronous operations easily and provide better error handling than callbacks and events
function promisesAsyncImplementation(promise, res) {
    promise
        .then(result => {
            //Success reponse
            res.statusCode = result.status
            res.json(result.body)
        })
        .catch(err => {
            //Error response
            res.statusCode = err.status
            res.json(err.body)
        });
}


function getGamesById(req, res) { //Implementation of the route to get a specific game by id
    console.log("Get A Specific Game By ID")
    promisesAsyncImplementation(
        serv.getGamesById(req.params.game_id),
        res
    )
}


function createGroup(req, res) { //Implementation of the route to create a group
    console.log("Create Group")
    //serv.createGroup(req.body.name, req.body.desc, (statusCode, groupObj) => processCb(statusCode, groupObj, res));
    promisesAsyncImplementation(serv.createGroup(req.body.name, req.body.desc),res)
}

function listGroups(req, res) { //Implementation of the route to get all groups
    console.log("List Groups")
    serv.listGroups((statusCode, groupObj) => processCb(statusCode, groupObj, res));
}

function getGroupByID(req, res) { //Implementation of the route to get a specific group
    console.log("Get A Specific Group")
    serv.getGroupByID(req.params.group_id, (statusCode, groupObj) => processCb(statusCode, groupObj, res));
}

function editGroup(req, res) { //Implementation of the route to update a specific group
    console.log("Edit Group")
    serv.editGroup(req.params.group_id, req.body.name, req.body.desc, (statusCode, groupObj) => processCb(statusCode, groupObj, res))
}

function removeGroup(req,res){
    console.log("Remove Group by ID")
    serv.removeGroup(req.params.group_id, (statusCode,groupObj) => processCb(statusCode,groupObj,res))
}


function addGameByIdToGroup(req, res) { //Implementation of the route to add a game by id to a specific group
    console.log("Add Game to Group")        
    serv.addGameByIdToGroup(req.params.game_id, req.params.group_id, (statusCode, groupObj) => processCb(statusCode, groupObj, res))
}

function getRatingsFromGames(req,res) { //Implementation of the route to get a game between the given interval of values
    console.log("Get Ratings From Games From Group")
    serv.getRatingsFromGames(req.params.group_id, req.params.max, req.params.min, (statusCode, gameObj) => processCb(statusCode, gameObj, res));
}


function removeGameById(req, res) { //Implementation of the route to delete a specific game from a group
    console.log("Remove Game By ID")
    serv.removeGameById(req.params.group_id, req.params.game_id, (statusCode, groupObj) => processCb(statusCode, groupObj, res))
}


//Process a callback
function processCb(statusCode, obj, res) {
    res.statusCode = statusCode;
    res.json(obj) //Send the response in json
}

module.exports = {
    getGamesById: getGamesById,
    
    createGroup: createGroup,
    listGroups: listGroups,
    getGroupByID: getGroupByID,
    editGroup: editGroup,
    removeGroup: removeGroup,

    addGameByIdToGroup: addGameByIdToGroup,
    getRatingsFromGames: getRatingsFromGames,
    removeGameById: removeGameById
}
