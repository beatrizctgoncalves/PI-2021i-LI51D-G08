'use strict'

//const services  = require('./covida-services.js');

function createWebApi(app, services) {
    const wa = {
        getSpecificGame: function(req, res) { //Implementation of the route to get a specific game by name
            console.log("Get A Specific Game By ID")
            promisesAsyncImplementation(
                services.getSpecificGame(req.params.game_name),
                res
            );
        },

        searchGamesByName: function(req, res) { //Implementation of the route to get a specificsearch for a game by name
            console.log("Get A Specific Game")
            promisesAsyncImplementation(
                services.searchGamesByName(req.params.game_name),
                res
            );
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

        getGroupByName: function(req, res) { //Implementation of the route to get a specific group
            console.log("Get A Specific Group")
            promisesAsyncImplementation(
                services.getGroupByName(req.params.group_name),
                res
            );
        },

        editGroup: function(req, res) { //Implementation of the route to update a specific group
            console.log("Edit Group")
            promisesAsyncImplementation(
                services.editGroup(req.params.group_name, req.body.name, req.body.desc),
                res
            );
        },

        removeGroup: function(req,res){
            console.log("Remove Group by ID")
            promisesAsyncImplementation(
                services.removeGroup(req.params.group_name),
                res
            );
        },


        addGameToGroup: function(req, res) { //Implementation of the route to add a game by id to a specific group
            console.log("Add Game to Group")        
            promisesAsyncImplementation(
                services.addGameToGroup(req.params.game_name, req.params.group_name),
                res
            );
        },

        getRatingsFromGames: function(req,res) { //Implementation of the route to get a game between the given interval of values
            console.log("Get Ratings From Games From Group")
            promisesAsyncImplementation(
                services.getRatingsFromGames(req.params.group_name, req.params.max, req.params.min),
                res
            );
        },


        removeGame: function(req, res) { //Implementation of the route to delete a specific game from a group
            console.log("Remove Game By ID")
            promisesAsyncImplementation(
                services.removeGame(req.params.group_name, req.params.game_name),
                res
            );
        }
    }
    app.get('/games/:game_name', wa.getSpecificGame); //Get a specific game by id
    app.get('/games/name/:game_name', wa.searchGamesByName); //Search game by name

    app.post('/groups', wa.createGroup); //Post a group in the database
    app.get('/groups', wa.listGroups); //Get all groups
    app.get('/groups/:group_name', wa.getGroupByName); //Get a specific group
    app.put('/groups/:group_name', wa.editGroup); //Update a specific group
    app.delete('/groups/:group_name', wa.removeGroup); //Remove a specific group by id

    app.get('/groups/:group_name/games/:min&:max', wa.getRatingsFromGames); //Get a game between the given interval of values
    app.put(`/groups/:group_name/games/:game_name`, wa.addGameToGroup); //Add a specific game by id to a group
    app.delete('/groups/:group_name/games/:game_name', wa.removeGame); //Remove a specific game by id from a group

    return wa;
}

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
        res.json({error: err.body})
    });
}

module.exports = createWebApi
