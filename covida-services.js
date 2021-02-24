'use strict'

const { request } = require("express")

function services(data, db, covidaResponses) {
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
                return data.getImage(game_id)
                .then(urlImage => {
                    gamesObj[0].urlImage = urlImage; //get image
                    return covidaResponses.setSuccessToList(
                        covidaResponses.OK,
                        gamesObj
                    )
                })
            })
        },

        //Implementation of the route to search for a game which accesses to the api
        searchGamesByName: function(game_name) {
            var regExp = /[a-zA-Z]/g;
            if(!regExp.test(game_name)) {  //verify if new_name has a string
                return covidaResponses.setError( //send the uri with id
                    covidaResponses.BAD_REQUEST,
                    covidaResponses.BAD_REQUEST_MSG
                )
            } else {
                return data.searchGamesByName(game_name)
                .then(gamesObj => {  
                    const newObj = gamesObj.map(e => {
                        return data.getImage(e.id)
                        .then(urlImage => e.urlImage = urlImage)
                    })
                    return Promise.all(newObj)
                    .then(() => {
                        return covidaResponses.setSuccessToList(
                            covidaResponses.OK,
                            gamesObj
                        )
                    })
                })
            }
        },


        //Implementation of the route to create a group which accesses to the database
        createGroup: function(request, index) {
            const group_name = request.body.name;
            const group_desc = request.body.desc;
            const owner = request.body.owner;

            var regExp = /[a-zA-Z]/g;
            if(!regExp.test(group_name)) {  //verify if group_name has a string
                return covidaResponses.setError(
                    covidaResponses.BAD_REQUEST,
                    covidaResponses.BAD_REQUEST_MSG
                )
            } else {
                return db.createGroup(group_name, group_desc, owner)
                .then(obj => {
                    return covidaResponses.setSuccessToUri( //send the uri with id
                        covidaResponses.CREATED,
                        index,
                        'groups/',
                        obj
                    )
                })
            }
        },

        //Implementation of the route to get all groups from a user which accesses to the database
        getGroups: function(owner) {
            return db.getGroups(owner)
                .then(groupObj => {
                    return covidaResponses.setSuccessToList(
                        covidaResponses.OK,
                        groupObj
                    )
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
        },

        //Implementation of the route to update a specific group which accesses to the database
        editGroup: function(group_id, new_name, new_desc, index) {
            var regExp = /[a-zA-Z]/g;
            if(!regExp.test(new_name)) {  //verify if new_name has a string
                return covidaResponses.setError( //send the uri with id
                    covidaResponses.BAD_REQUEST,
                    covidaResponses.BAD_REQUEST_MSG
                )
            } else {
                return db.editGroup(group_id, new_name, new_desc)
                    .then(groupObj => {
                        return covidaResponses.setSuccessToUri(
                            covidaResponses.OK,
                            index,
                            'groups/',
                            groupObj
                        )
                    })
            }
        },

       //Implementation of the route to remove a specific group which accesses to the database
       removeGroup: function(group_id, index){
            return db.removeGroup(group_id)
            .then(groupObj => {
                return covidaResponses.setSuccessToUri(
                    covidaResponses.OK,
                    index,
                    'groups/',
                    groupObj
                )
            })
        },


        //Implementation of the route to add a game by name to a specific group which accesses to the database
        addGameToGroup: function(game_id, group_id, index) { //save just game id and name
            return data.getSpecificGame(game_id) //check if the game exists
                .then(gamesObj => {
                    return data.getImage(game_id)
                        .then(urlImage => {
                            gamesObj[0].urlImage = urlImage; //get image
                            return db.getGroupById(group_id) //check if the group exists
                                .then(groupObj => {
                                    const gameExists = groupObj.games.findIndex(g => g.id === parseInt(game_id))
                                    if(gameExists != -1) {  //check if the game already exists in the group
                                        return covidaResponses.setError(
                                            covidaResponses.FORBIDDEN,
                                            covidaResponses.FORBIDDEN_GAME_MSG
                                        )
                                    } else {
                                        return db.addGameToGroup(gamesObj, group_id) //add game
                                            .then(finalObj => {
                                                return covidaResponses.setSuccessToUri(
                                                    covidaResponses.OK,
                                                    index,
                                                    'groups/',
                                                    finalObj
                                                )   
                                            })
                                    }
                                })
                        })
                })
        },

        //Implementation of the route to get a game between the given interval of values which accesses to both database and api
        getRatingsFromGames: function(group_id, max, min) { 
            var regExp = /[a-zA-Z]/g;
            if(max > 100 || parseInt(min) < 0 || parseInt(max) < 0 || parseInt(min) > parseInt(max) || regExp.test(max) || regExp.test(min)) {  //Check if the values are acceptable
                return covidaResponses.setError(covidaResponses.BAD_REQUEST, covidaResponses.RATINGS_WRONG_MSG);
            }
            return db.getGroupById(group_id)
                .then(groupObj => {
                    const gamesArray = [];
                    const newObj = groupObj.games.map(g => {
                        return data.getSpecificGame(g.id)
                            .then(gameResult => {
                                if(gameResult[0].total_rating > min && gameResult[0].total_rating < max) {
                                    return data.getImage(g.id)
                                        .then(urlImage => {
                                            gameResult[0].urlImage = urlImage; //get image
                                            gamesArray.push(gameResult[0]);
                                            return;
                                        })
                                } else {
                                    return;
                                }
                            })
                    });
                    return Promise.all(newObj)
                        .then(() => {
                            if(gamesArray.length) {
                                gamesArray.sort((a, b) => b.total_rating - a.total_rating); //sort the array games so that games can appear decreasingly
                                return covidaResponses.setSuccessToList(
                                    covidaResponses.OK,
                                    gamesArray
                                )
                            } else {
                                return covidaResponses.setError(covidaResponses.NOT_FOUND, covidaResponses.GAMES_0_MSG);
                            }  
                        }) 
                })
        },

        //Implementation of the route to delete a specific game which accesses to the database
        removeGame: function(group_id, game_id, index) {
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
                            index,
                            'groups/',
                            finalObj
                        )
                    })
                }
            })
        },

        //Implementation of the route to create a group which accesses to the database
        createUser: function(username, password, index) {
            var regExp = /[a-zA-Z]/g;
            if(!regExp.test(username)) {  //verify if username has a string
                return covidaResponses.setError(
                    covidaResponses.BAD_REQUEST,
                    covidaResponses.BAD_REQUEST_MSG
                )
            } else {
                return db.getUserByName(username)
                    .then(() => {
                        return covidaResponses.setError(
                            covidaResponses.FORBIDDEN,
                            covidaResponses.FORBIDDEN_USER_MSG
                        )
                })
                .catch(error => {
                    if(error.status == covidaResponses.FORBIDDEN || error.status == covidaResponses.BAD_REQUEST || error.status == covidaResponses.DB_ERROR) {
                        return covidaResponses.setError(error.status, error.body);
                    } else {
                        return db.createUser(username, password)
                            .then(obj => {
                                return covidaResponses.setSuccessToUri( //send the uri with id
                                    covidaResponses.CREATED,
                                    index,
                                    'users/',
                                    obj
                                )
                            })
                    }
                })
            }             
        },

        //Implementation of the route to get a specific group which accesses to the database
        getUserById: function(user_id) {
            return db.getUserById(user_id)
            .then(userObj => {
                return covidaResponses.setSuccessToList(
                    covidaResponses.OK,
                    userObj
                )
            })
        },

        //Implementation of the route to get a specific group which accesses to the database
        getUserByName: function(username) {
            return db.getUserByName(username)
                .then(userObj => {
                    return covidaResponses.setSuccessToList(
                        covidaResponses.OK,
                        userObj
                    )
                })
        },

        signIn: function(request) {
            const requestBody = request.body;
            const username = requestBody.username;
            const password = requestBody.password;
            return this.getUserByName(username)
                .then(foundUser => {
                    if(foundUser.body[0].password != password) {
                        return covidaResponses.setError(
                            covidaResponses.NOT_FOUND,
                            covidaResponses.PASSWORD_USER_MSG
                        )
                    } else {
                        //User Login
                        return new Promise((resolve, reject) => {
                            request.login(foundUser.body[0], (err, result) => {
                                if (err) {        
                                    reject(err);
                                } else {
                                    resolve(result);
                                }
                            })
                        })
                        .then(() => {
                            return covidaResponses.setSuccessToList(
                                covidaResponses.OK,
                                username
                            );
                        })
                    }
                })
        }
    };
    return serv;
}

module.exports = services;
