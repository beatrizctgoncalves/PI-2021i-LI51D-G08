'use strict'

const { BAD_REQUEST } = require('./covida-responses');
//const data = require('./igdb-data.js');
//const db = require('./covida-db.js');
const covidaResponses = require('./covida-responses');

function services(data, db) {
    const serv = {
        
        //Implementation of the route to get a specific game by id which accesses to the api
        getSpecificGame: function(game_id) {
            if(!/^\d+$/.test(game_id)) {
                return covidaResponses.setError(
                    covidaResponses.BAD_REQUEST,
                    covidaResponses.BAD_REQUEST_MSG
                )
            }
            return data.getSpecificGame(game_id)
            .then(gamesObj => {
                return covidaResponses.setSuccessToList(
                    covidaResponses.OK,
                    gamesObj
                )                            
            })
            .catch(error => {
                if(error.status == covidaResponses.NOT_FOUND || error.status == covidaResponses.BAD_REQUEST) return covidaResponses.setError(error.status, error.body);
                else return covidaResponses.setError(covidaResponses.API_ERROR, covidaResponses.API_ERROR_MSG);
            })
        },

        //Implementation of the route to search for a game which accesses to the api
        searchGamesByName: function(game_name) {
            return data.searchGamesByName(game_name)
            .then(gamesObj => {
                return covidaResponses.setSuccessToList(
                    covidaResponses.OK,
                    gamesObj
                )
            })
            .catch(error => {
                if(error.status == covidaResponses.NOT_FOUND) return covidaResponses.setError(error.status, error.body);
                else return covidaResponses.setError(covidaResponses.API_ERROR, covidaResponses.API_ERROR_MSG);
            })
        },


        //Implementation of the route to create a group which accesses to the database
        createGroup: function(group_name, group_desc) {
            var regExp = /[a-zA-Z]/g;
            if(!regExp.test(group_name)) {  //verify if group_name has a string
                return covidaResponses.setError( //send the uri with id
                    covidaResponses.BAD_REQUEST,
                    covidaResponses.BAD_REQUEST_MSG
                )
            } else {
                return db.createGroup(group_name, group_desc)
                .then(obj => {
                    return covidaResponses.setSuccessToUri( //send the uri with id
                        covidaResponses.CREATED,
                        obj
                    )
                }) 
                .catch(error => {//put in covida-db
                    if(error.status == covidaResponses.BAD_REQUEST) return covidaResponses.setError(error.status, error.body);
                    else return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG);
                })
            }
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
            .catch(error => {
                if(error.status == covidaResponses.NOT_FOUND) return covidaResponses.setError(error.status, error.body);
                else return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG);
            })
        },

        //Implementation of the route to get a specific group which accesses to the database
        getGroupById: function(group_id) {
            return db.getGroupById(group_id)
            .then(groupObj => {
                return covidaResponses.setSuccessToList(
                    covidaResponses.OK,
                    groupObj
                )
            })
            .catch(error => {
                if(error.status == covidaResponses.NOT_FOUND) return covidaResponses.setError(error.status, error.body);
                else return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG);
            })
        },

        //Implementation of the route to update a specific group which accesses to the database
        editGroup: function(group_id, new_name, new_desc) {
            return db.editGroup(group_id, new_name, new_desc)
            .then(groupObj => {
                return covidaResponses.setSuccessToUri(
                    covidaResponses.OK,
                    groupObj
                )
            })
            .catch(error => {
                if(error.status == covidaResponses.NOT_FOUND) return covidaResponses.setError(error.status, error.body);
                else return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG);
            })
        },

       //Implementation of the route to remove a specific group which accesses to the database
       removeGroup: function(group_id){
            return db.removeGroup(group_id)
            .then(groupObj => {
                return covidaResponses.setSuccessToUri(
                    covidaResponses.OK,
                    groupObj
                )
            })
            .catch(error => {
                if(error.status == covidaResponses.NOT_FOUND) return covidaResponses.setError(error.status, error.body);
                else return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG);
            })
        },


        //Implementation of the route to add a game by name to a specific group which accesses to the database
        addGameToGroup: function(game_id, group_id) { //save just game id and name
            return data.getSpecificGame(game_id) //check if the game exists
            .then(gamesObj => {
                return db.getGroupById(group_id) //check if the group exists
                .then(groupObj => {
                    const gameExists = groupObj.games.findIndex(g => g.id === parseInt(game_id))
                    if(gameExists != -1) {  //check if the game already exists in the group
                        return covidaResponses.setError(
                            covidaResponses.CONFLIT_GAME, 
                            covidaResponses.CONFLIT_GAME_MSG
                        )
                    } else {
                        return db.addGameToGroup(gamesObj, group_id) //add game
                        .then(finalObj => {
                            return covidaResponses.setSuccessToUri(
                                covidaResponses.OK,
                                finalObj
                            )   
                        })
                    }
                })
            })
            .catch(error => {
                if(error.status == covidaResponses.NOT_FOUND) return covidaResponses.setError(error.status, error.body);
                else return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG);
            })
        },

        //Implementation of the route to get a game between the given interval of values which accesses to both database and api
        getRatingsFromGames: function(group_id, max, min) { 
            if(max > 100 || min < 0) {  //Check if the values are acceptable
                return covidaResponses.setError(covidaResponses.BAD_REQUEST, covidaResponses.RATINGS_WRONG_MSG);
            }
            return db.getGroupById(group_id)
            .then(groupObj => {
                const gameExists = groupObj.games.findIndex(g => g.id === parseInt(game_id))
                if(gameExists == -1) {  //check if the game already exists in the group
                    return covidaResponses.setError(
                        covidaResponses.NOT_FOUND,
                        covidaResponses.GAME_NOT_FOUND_MSG
                    )
                } else {
                    return data.getSpecificGame(game_id) //get game's information because ratings can change
                    .then(gamesObj => {
                        var games = gamesObj.games.filter(g => g.total_rating > min && g.total_rating < max);
                        games.sort((a, b) => b.total_rating - a.total_rating); //sort the array games so that games can appear decreasingly
                        return covidaResponses.setSuccessToList(
                            covidaResponses.OK,
                            games
                        ) 
                    })
                }       
            })
            .catch(error => {
                if(error.status == covidaResponses.NOT_FOUND) return covidaResponses.setError(error.status, error.body);
                else return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG);
            })
        },

        //Implementation of the route to delete a specific game which accesses to the database
        removeGame: function(group_id, game_id) {
            return db.getGroupById(group_id) //check if the group exists
            .then(groupObj => {
                const game_index = groupObj.games.findIndex(g => g.id === parseInt(game_id))  //get the games' index
                if(game_index === -1) { //the game doesnt exist in the group
                    return covidaResponses.setError(
                        covidaResponses.NOT_FOUND,
                        covidaResponses.GAME_NOT_FOUND_MSG
                    );
                } else {
                    return db.removeGame(group_id, game_index) //remove the game by index
                    .then(finalObj => {
                        return covidaResponses.setSuccessToUri(
                            covidaResponses.OK,
                            finalObj
                        )
                    })
                }
            })
            .catch(error => {
                if(error.status == covidaResponses.NOT_FOUND) return covidaResponses.setError(error.status, error.body);
                else return covidaResponses.setError(covidaResponses.DB_ERROR, covidaResponses.DB_ERROR_MSG);
            })
        }
    };
    return serv;
}

module.exports = services;
