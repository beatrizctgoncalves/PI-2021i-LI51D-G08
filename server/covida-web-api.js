'use strict'

//const services  = require('./covida-services.js');

function createWebApi(app, services) {
    const wa = {
        getSpecificGame: function(req, res) { //Implementation of the route to get a specific game by id
            console.log("Get A Specific Game By ID")
            promisesAsyncImplementation(
                services.getSpecificGame(req.params.game_id),
                res
            );
        },

        searchGamesByName: function(req, res) { //Implementation of the route to get a specificsearch for a game by name
            console.log("Search Game By Name")
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

        getGroupById: function(req, res) { //Implementation of the route to get a specific group
            console.log("Get A Specific Group")
            promisesAsyncImplementation(
                services.getGroupById(req.params.group_id),
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

        removeGroup: function(req,res) {    //Implementation of the route to remove a group by id
            console.log("Remove Group by ID")
            promisesAsyncImplementation(
                services.removeGroup(req.params.group_id),
                res
            );
        },


        addGameToGroup: function(req, res) { //Implementation of the route to add a game by id to a specific group
            console.log("Add Game to Group")        
            promisesAsyncImplementation(
                services.addGameToGroup(req.params.game_id, req.params.group_id),
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


        removeGame: function(req, res) { //Implementation of the route to delete a specific game from a group
            console.log("Remove Game By ID")
            promisesAsyncImplementation(
                services.removeGame(req.params.group_id, req.params.game_id),
                res
            );
        },

        signUp: function(req, res) {
            console.log("Create User")
            promisesAsyncImplementation(
                services.createUser(req.body.username, req.body.password),
                res
            )
        },
        
        getUserById: function(req, res) {
            console.log("Get A Specific User")
            promisesAsyncImplementation(
                services.getUserById(req.params.user_id),
                res
            )
        },

        signIn: function(req, res) {
            console.log("Sign In")
            promisesAsyncImplementation(
                services.signIn(req),
                res
            )
        },

        getUser: function(req, res) {
            console.log("Get User")
            promisesAsyncImplementation(
                services.getUser(req),
                res
            )
        },

        logout: function(req, res) {
            console.log("Logout");
            req.logout();
            res.send();
        }
    }
    app.post('/users/signup', wa.signUp)
    app.get('/users/:user_id', wa.getUserById)
    app.post('/users/signin', wa.signIn)
    app.get('/user', wa.getUser)
    app.post('/users/logout', wa.logout)

    app.get('/games/id/:game_id', wa.getSpecificGame); //Get a specific game by id
    app.get('/games/name/:game_name', wa.searchGamesByName); //Search game by name

    app.post('/groups', wa.createGroup); //Post a group in the database
    app.get('/groups', wa.listGroups); //Get all groups
    app.get('/groups/:group_id', wa.getGroupById); //Get a specific group
    app.put('/groups/:group_id', wa.editGroup); //Update a specific group
    app.delete('/groups/:group_id', wa.removeGroup); //Remove a specific group by id

    app.get('/groups/:group_id/games/:min&:max', wa.getRatingsFromGames); //Get a game between the given interval of values
    app.put(`/groups/:group_id/games/:game_id`, wa.addGameToGroup); //Add a specific game by id to a group
    app.delete('/groups/:group_id/games/:game_id', wa.removeGame); //Remove a specific game by id from a group

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
