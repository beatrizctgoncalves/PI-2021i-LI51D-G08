'use strict'

const data = require('./igdb-data.js');
const db = require('./covida-db.js');
const responses = require('./responses');

 //All methods have a callback so the access to the api can be asynchronous

//Implementation of the route to get a specific game by id which accesses to the api
function getGamesById(game_id) {
    return data.getGamesById(game_id)
        .then(gamesObj => {
            console.log(gamesObj)
            if (gamesObj) {
                return responses.setSuccess(
                    responses.OK,
                    gamesObj
                )
            } else {
                return responses.setError(
                    responses.NOT_FOUND,
                    responses.GAME_NOT_FOUND_MSG
                )
            }
        })
        .catch(err => {
            return responses.setError(err.status, err.body)
        })
}


//Implementation of the route to create a group which accesses to the database
function createGroup(group_name, group_desc) {
    if(group_name && group_desc) {
        return db.createGroup(group_name, group_desc)
        .then(() => {
            return responses.setSuccess(
                responses.CREATED,
                responses.GROUP_CREATED_MSG
            )
        })
        .catch(err => {
            return responses.setError(err.status, err.body)
        })
    } else {
        return responses.setError(responses.BAD_REQUEST, responses.BAD_REQUEST_MSG)
    }
}

//Implementation of the route to get all groups which accesses to the database
function listGroups() {
    return db.listGroups()
        .then(groupObj => {
            if(groupObj) {
                return responses.setSuccess(
                    responses.OK,
                    groupObj
                )
            } else {
                return responses.setError(
                    responses.NOT_FOUND,
                    responses.GROUPS_0_MSG
                )
            }
        })
        .catch(err => {
            return responses.setError(err.status, err.body)
        })
}

//Implementation of the route to get a specific group which accesses to the database
function getGroupByID(group_id) {
    return db.getGroupByID(group_id)
        .then(groupObj => {
            if(groupObj) {
                return responses.setSuccess(
                    responses.OK,
                    groupObj
                )
            } else {
                return responses.setError(
                    responses.NOT_FOUND,
                    responses.GROUP_NOT_FOUND_MSG
                )
            }
        })
        .catch(err => {
            return responses.setError(err.status, err.body)
        })
}

//Implementation of the route to update a specific group which accesses to the database
function editGroup(group_id, new_name, new_desc, processEditGroup) {
    db.editGroup(group_id, new_name, new_desc, cb);
    
    function cb(err, groupObj) {
        processEditGroup(err, groupObj)
    }
}

function removeGroup(group_id, processRemoveGroup){
    db.removeGroup(group_id, cb)

    function cb(err,gameObj){
        processRemoveGroup(err,gameObj)
    }
}


//Implementation of the route to add a game by name to a specific group which accesses to the database
function addGameByIdToGroup(game_id, group_id, processAddGameByIdToGroup){
    data.getGamesById(game_id, processGetGamesById)

    function processGetGamesById(err, gameObj) {
        if(gameObj === "[]") {
            processAddGameByIdToGroup(responses.NOT_FOUND, responses.setError({ "error": "The game you inserted doesnt exist." }))
        } else {
            db.addGameToGroup(gameObj, group_id, cb);
        }
    }

    function cb(err, groupObj) {
        processAddGameByIdToGroup(err, groupObj)
    }
}

//Implementation of the route to get a game between the given interval of values which accesses to both database and api
function getRatingsFromGames(group_id, max, min, processGetRatingsFromGames) {
    db.getRatingsFromGames(group_id, max, min, cb);
    
    function cb(err, gameObj) {
        processGetRatingsFromGames(err, gameObj);
    }
}

//Implementation of the route to delete a specific game which accesses to the database
function removeGameById(group_id, game_id, processRemoveGameById) {
    db.removeGameById(group_id, game_id, cb)

    function cb(err, gameObj) {
        processRemoveGameById(err, gameObj);
    }
}

module.exports = {
    getGamesById: getGamesById,

    createGroup: createGroup,
    listGroups: listGroups,
    getGroupByID: getGroupByID,
    editGroup: editGroup,
    removeGroup : removeGroup,
    
    addGameByIdToGroup: addGameByIdToGroup,
    getRatingsFromGames: getRatingsFromGames,
    removeGameById: removeGameById,
}
