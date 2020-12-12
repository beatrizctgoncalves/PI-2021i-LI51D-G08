'use strict'

//const services  = require('./covida-services.js');

function createWebApi(app, services) {
    const wa = {

        //Handle multiple asynchronous operations easily and provide better error handling than callbacks and events
        promisesAsyncImplementation: function(promise, res) {
            promise
                .then(result => {
                    //Success reponse
                    res.statusCode = result.status
                    res.json(result.body)
                })
                .catch(err => {
                    //Error response
                    res.statusCode = err.status
                    res.json({error: err.body})
                });
        },


        getGamesById: function(req, res) { //Implementation of the route to get a specific game by id
            console.log("Get A Specific Game By ID")
            promisesAsyncImplementation(
                services.getGamesById(req.params.game_id),
                res
            );
        },

        getGamesByName: function(req, res) { //Implementation of the route to get a specific game
            console.log("Get A Specific Game")
            services.getGamesWithName(req.params.game_name, (err, gameObj) => processCb(err, gameObj, res));
        },

        createGroup: function(req, res) { //Implementation of the route to create a group
            console.log("Create Group")
            promisesAsyncImplementation(
                services.createGroup(req.body.name, req.body.desc),
                res
            );
        },

        listGroups: function(req, res) { //Implementation of the route to get all groups
            console.log("List Groups")
            promisesAsyncImplementation(
                services.listGroups(),
                res
            );
        },

        getGroupByID: function(req, res) { //Implementation of the route to get a specific group
            console.log("Get A Specific Group")
            promisesAsyncImplementation(
                services.getGroupByID(req.params.group_id),
                res
            );
        },

        editGroup: function(req, res) { //Implementation of the route to update a specific group
            console.log("Edit Group")
            promisesAsyncImplementation(
                services.editGroup(req.params.group_id, req.body.name, req.body.desc),
                res
            );
        },

        removeGroup: function(req,res){
            console.log("Remove Group by ID")
            promisesAsyncImplementation(
                services.removeGroup(req.params.group_id),
                res
            );
        },


        addGameByIdToGroup: function(req, res) { //Implementation of the route to add a game by id to a specific group
            console.log("Add Game to Group")        
            promisesAsyncImplementation(
                services.addGameByIdToGroup(req.params.game_id, req.params.group_id),
                res
            );
        },

        getRatingsFromGames: function(req,res) { //Implementation of the route to get a game between the given interval of values
            console.log("Get Ratings From Games From Group")
            promisesAsyncImplementation(
                services.getRatingsFromGames(req.params.group_id, req.params.max, req.params.min),
                res
            );
        },


        removeGameById: function(req, res) { //Implementation of the route to delete a specific game from a group
            console.log("Remove Game By ID")
            promisesAsyncImplementation(
                servicesv.removeGameById(req.params.group_id, req.params.game_id),
                res
            );
        }
    }
    app.get('/games/:game_id', wa.getGamesById); //Get a specific game by id
    app.get('/games/:game_name', wa.getGamesByName); //Get a specific game by name

    app.post('/groups', wa.createGroup); //Post a group in the database
    app.get('/groups', wa.listGroups); //Get all groups
    app.get('/groups/:group_id', wa.getGroupByID); //Get a specific group
    app.put('/groups/:group_id', wa.editGroup); //Update a specific group
    app.delete('/groups/:group_id', wa.removeGroup); //Remove a specific group by id

    app.get('/groups/:group_id/games/:min&:max', wa.getRatingsFromGames); //Get a game between the given interval of values
    app.put(`/groups/:group_id/games/:game_id`, wa.addGameByIdToGroup); //Add a specific game by id to a group
    app.delete('/groups/:group_id/games/:game_id', wa.removeGameById); //Remove a specific game by id from a group

    return wa;
}

module.exports = {
    createWebApi
}
