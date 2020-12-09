'use strict'

 const data = require('./igdb-data.js');
 const db = require('./covida-db.js');
 const error = require('./error');

 //All methods have a callback so the access to the api can be asynchronous

//Implementation of the route to get a specific game by id which accesses to the api
function getGamesById(game_id, processGetGamesById) {
    data.getGamesById(game_id, cb);

    function cb(err, gameObj) {
        processGetGamesById(err, gameObj)
    }        
}

//Implementation of the route to create a group which accesses to the database
function createGroup(group_name, group_desc, processCreateGroup) {
    db.createGroup(group_name, group_desc, cb);

    function cb(err, groupObj) {
        processCreateGroup(err, groupObj);
    }
}

//Implementation of the route to get all groups which accesses to the database
function listGroups(processListGroups) {
    db.listGroups(cb)

    function cb(err, groupObj) {
        processListGroups(err, groupObj);
    }
}

//Implementation of the route to get a specific group which accesses to the database
function getGroupByName(group_name, processGetGroupByName) {
    db.getGroupByName(group_name, cb);

    function cb(err, groupObj) {
        processGetGroupByName(err, groupObj);
    }
}

//Implementation of the route to add a game by name to a specific group which accesses to the database
function addGameByIdToGroup(game_id, group_name, processAddGameByIdToGroup){
    data.getGamesById(game_id, processGetGamesById)

    function processGetGamesById(err, gameObj) {
        if(gameObj === "[]") {
            processAddGameByIdToGroup(error.NOT_FOUND, error.setError({ "error": "The game you inserted doesnt exist." }))
        } else {
            db.addGameToGroup(gameObj, group_name, cb);
        }
    }

    function cb(err, groupObj) {
        processAddGameByIdToGroup(err, groupObj)
    }
}

//Implementation of the route to get a game between the given interval of values which accesses to both database and api
function getRatingsFromGames(group_name, max, min, processGetRatingsFromGames) {
    db.getRatingsFromGames(group_name, max, min, cb);
    
    function cb(err, gameObj) {
        processGetRatingsFromGames(err, gameObj);
    }
}

//Implementation of the route to update a specific group which accesses to the database
function editGroup(old_name, new_name, new_desc, processEditGroup) {
    db.editGroup(old_name, new_name, new_desc, cb);
    
    function cb(err, groupObj) {
        processEditGroup(err, groupObj)
    }
}

//Implementation of the route to delete a specific game which accesses to the database
function removeGameById(group_name, game_id, processRemoveGameById) {
    db.removeGameById(group_name, game_id, cb)

    function cb(err, gameObj) {
        processRemoveGameById(err, gameObj);
    }
}

module.exports = {

    getGamesById: getGamesById,

    createGroup: createGroup,
    listGroups: listGroups,
    getGroupByName: getGroupByName,
    addGameByIdToGroup: addGameByIdToGroup,

    getRatingsFromGames: getRatingsFromGames,
    editGroup: editGroup,
    removeGameById: removeGameById,
}
