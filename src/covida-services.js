'use strict'

//const data = require('./igdb-data.js');
//const db = require('./covida-db.js');
const responses = require('./responses');

function services(data, db) {
    const serv = {
        //Implementation of the route to get a specific game by id which accesses to the api
        getGamesById: function(game_id) {
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
        },

        //Implementation of the route to get a specific game which accesses to the api
        getGamesByName: function(game_name, processGetGamesByName) {
            data.getGamesByName(game_name, cb)

            function cb(err, gameObj) {
                if(gameObj === "[]") {
                    var errorMessageObj = "The game you inserted doesnt exist.";
                    processGetGamesByName(err, errorMessageObj)
                } else {
                    processGetGamesByName(err, gameObj);
                }
            }
        },


        //Implementation of the route to create a group which accesses to the database
        createGroup: function(group_name, group_desc) {
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
        },

        //Implementation of the route to get all groups which accesses to the database
        listGroups: function() {
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
        },

        //Implementation of the route to get a specific group which accesses to the database
        getGroupByID: function(group_id) {
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
        },

        //Implementation of the route to update a specific group which accesses to the database
        editGroup: function(group_id, new_name, new_desc) {
            return db.editGroup(group_id, new_name, new_desc)
                .then(groupObj => {
                    if(groupObj) {
                        return responses.setSuccess(
                            responses.OK,
                            responses.GROUP_EDITED_MSG
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
        },

        removeGroup: function(group_id){
            return db.removeGroup(group_id)
                .then(groupObj => {
                    if(groupObj) {
                        return responses.setSuccess(
                            responses.OK,
                            responses.GROUP_REMOVED_MSG
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
        },


        //Implementation of the route to add a game by name to a specific group which accesses to the database
        addGameByIdToGroup: function(game_id, group_id){
            return data.getGamesById(game_id)
                .then(gamesObj => {
                    console.log(gamesObj)
                    if (gamesObj) {
                        db.addGameToGroup(gameObj, group_id)
                        .then(groupObj => {
                            if(groupObj) {
                                return responses.setSuccess(
                                    responses.OK,
                                    responses.GAME_ADD_TO_GROUP_MSG
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
        },

        //Implementation of the route to get a game between the given interval of values which accesses to both database and api
        getRatingsFromGames: function(group_id, max, min) {
            if(max > 100 || min < 0) return responses.setError(responses.BAD_REQUEST, responses.RATINGS_WRONG_MSG)
            return db.getRatingsFromGames(group_id, max, min)
                .then(groupObj => {
                    if(groupObj) {
                        return responses.setSuccess(
                            responses.OK,
                            responses.GROUP_REMOVED_MSG
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
        },

        //Implementation of the route to delete a specific game which accesses to the database
        removeGameById: function(group_id, game_id) {
            return db.removeGameById(group_id, game_id)
                .then(groupObj => {
                    if(groupObj) {
                        return responses.setSuccess(
                            responses.OK,
                            responses.GROUP_REMOVED_MSG
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
    };
    return serv;
}

module.exports = services;
