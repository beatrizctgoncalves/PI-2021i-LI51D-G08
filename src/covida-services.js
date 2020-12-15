'use strict'

//const data = require('./igdb-data.js');
//const db = require('./covida-db.js');
const covidaResponses = require('./covida-responses');

function services(data, db) {
    const serv = {
        
        //DONE
        //Implementation of the route to get a specific game by name which accesses to the api
        getSpecificGame: function(game_id) {
            if(!/^\d+$/.test(game_id)) return covidaResponses.setError(
                covidaResponses.BAD_REQUEST,
                covidaResponses.BAD_REQUEST_MSG
                )
            return data.getSpecificGame(game_id)
                .then(gamesObj => {
                    if (gamesObj) {
                        return covidaResponses.setSuccessToList(
                            covidaResponses.OK,
                            gamesObj
                        )                        
                    } else {
                        return covidaResponses.setError(
                            covidaResponses.NOT_FOUND,
                            covidaResponses.GAME_NOT_FOUND_MSG
                        )
                    }
                })
                .catch(err => {
                    return covidaResponses.setError(err.status, err.body)
                })
        },

        //Implementation of the route to search for a game which accesses to the api
        searchGamesByName: function(game_name) {
            return data.searchGamesByName(game_name)
            .then(gamesObj => {
                if (gamesObj) {
                    return covidaResponses.setSuccessToList(
                        covidaResponses.OK,
                        gamesObj
                    )
                } else {
                    return covidaResponses.setError(
                        covidaResponses.NOT_FOUND,
                        covidaResponses.GAME_NOT_FOUND_MSG
                    )
                }
            })
            .catch(err => {
                return covidaResponses.setError(err.status, err.body)
            })
        },


        //Implementation of the route to create a group which accesses to the database
        createGroup: function(group_name, group_desc) {
            return db.createGroup(group_name, group_desc)
            .then(obj => {
                return covidaResponses.setSuccess(
                    covidaResponses.CREATED,
                    obj
                )})
            .catch(err => {
                return covidaResponses.setError(err.status, err.body)
            })
        },

        //Implementation of the route to get all groups which accesses to the database
        listGroups: function() {
            return db.listGroups()
            .then(groupObj => {
                return covidaResponses.setSuccessToList(
                    covidaResponses.OK,
                    groupObj
                )
            })
            .catch(err => covidaResponses.setError(err.status, err.body))
        },

        //Implementation of the route to get a specific group which accesses to the database
        getGroupById: function(group_id) {
            return db.getGroupById(group_id)
            .then(groupObj => {
                return covidaResponses.setSuccess(
                    covidaResponses.OK,
                    groupObj
                )
                return covidaResponses.setError(
                    covidaResponses.NOT_FOUND,
                    covidaResponses.GROUP_NOT_FOUND_MSG
                )
            })
            .catch(err => covidaResponses.setError(err.status, err.body))
        },

        //Implementation of the route to update a specific group which accesses to the database
        editGroup: function(group_name, new_name, new_desc) {
            return db.editGroup(group_name, new_name, new_desc)
                .then(groupObj => {
                    if(groupObj) {
                        return covidaResponses.setSuccess(
                            covidaResponses.OK,
                            covidaResponses.GROUP_EDITED_MSG
                        )
                    } else {
                        return covidaResponses.setError(
                            covidaResponses.NOT_FOUND,
                            covidaResponses.GROUP_NOT_FOUND_MSG
                        )
                    }
                })
                .catch(err => {
                    return covidaResponses.setError(err.status, err.body)
                })
        },

        //Implementation of the route to remove a specific group which accesses to the database
        removeGroup: function(group_name){
            return db.removeGroup(group_name)
                .then(groupObj => {
                    if(groupObj) {
                        return covidaResponses.setSuccess(
                            covidaResponses.OK,
                            covidaResponses.GROUP_REMOVED_MSG
                        )
                    } else {
                        return covidaResponses.setError(
                            covidaResponses.NOT_FOUND,
                            covidaResponses.GROUP_NOT_FOUND_MSG
                        )
                    }
                })
                .catch(err => {
                    return covidaResponses.setError(err.status, err.body)
                })
        },


        //Implementation of the route to add a game by name to a specific group which accesses to the database
        addGameToGroup: function(game_name, group_name) {
            return data.getSpecificGame(game_name) //check if the game exists
            .then(gamesObj => {
                if (gamesObj) {
                    return db.getGroupByName(group_name) //check if the group exists
                    .then(groupObj => {
                        if(groupObj) {
                            if(groupObj.games.findIndex(g => g.name == game_name) != -1) { //check if the game already exists in the group
                                return covidaResponses.setError(
                                    covidaResponses.CONFLIT_GAME,
                                    covidaResponses.CONFLIT_GAME_MSG
                                )
                            } else {
                                return db.addGameToGroup(gamesObj, group_name) //add game
                                .then(() => {
                                    return covidaResponses.setSuccess(
                                        covidaResponses.OK,
                                        covidaResponses.GAME_ADD_TO_GROUP_MSG
                                    )   
                                })
                            }
                        } else {
                            return covidaResponses.setError(
                                covidaResponses.NOT_FOUND,
                                covidaResponses.GROUP_NOT_FOUND_MSG
                            )
                        }
                    })
                } else {
                    return covidaResponses.setError( //group doesnt exist
                        covidaResponses.NOT_FOUND,
                        covidaResponses.GAME_NOT_FOUND_MSG
                    )
                }
            })
            .catch(err => covidaResponses.setError(err.status, err.body))
        },

        //Implementation of the route to get a game between the given interval of values which accesses to both database and api
        getRatingsFromGames: function(group_name, max, min) {
            if(max > 100 || min < 0) {  //Check if the values are acceptable
                return covidaResponses.setError(covidaResponses.BAD_REQUEST, covidaResponses.RATINGS_WRONG_MSG);
            }
            
            return db.getRatingsFromGames(group_name, max, min)
            .then(groupObj => {
                if(groupObj === covidaResponses.GROUP_NOT_FOUND_MSG) { //group doesnt exist
                    return covidaResponses.setError(
                        covidaResponses.NOT_FOUND,
                        groupObj
                    )
                } else if(groupObj === covidaResponses.GAME_NOT_FOUND_MSG) { //check if the game exists in the group
                    return covidaResponses.setError(
                        covidaResponses.NOT_FOUND,
                        groupObj
                    )
                } else {
                    return covidaResponses.setSuccess(
                        covidaResponses.OK,
                        covidaResponses.GAME_REMOVED_FROM_GROUP_MSG
                    )     
                }
            })
            .catch(err => covidaResponses.setError(err.status, err.body))
        },

        //Implementation of the route to delete a specific game which accesses to the database
        removeGame: function(group_name, game_name) {
            return db.getGroupByName(group_name) //check if the group exists
            .then(groupObj => {
                if(groupObj) {
                    const game_index = groupObj.games.findIndex(g => g.name === game_name)  //get the games' index
                    if(game_index === -1) { //the game doesnt exist in the group
                        return covidaResponses.setError(
                            covidaResponses.NOT_FOUND,
                            covidaResponses.GAME_NOT_FOUND_MSG
                        );
                    } else {
                        return db.removeGame(group_name, game_index) //remove the game by index
                        .then(() => {
                            return covidaResponses.setSuccess(
                                covidaResponses.OK,
                                covidaResponses.GAME_REMOVED_FROM_GROUP_MSG
                            )
                        })
                    }
                } else {
                    return covidaResponses.setError(
                        covidaResponses.NOT_FOUND,
                        covidaResponses.GROUP_NOT_FOUND_MSG
                    )
                }
            })
            .catch(err => covidaResponses.setError(err.status, err.body))
        }
    };
    return serv;
}

module.exports = services;
