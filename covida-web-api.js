'use strict'

const express = require('express')

module.exports = function(services) {
    if (!services) {
        throw "Invalid services object";
    }
    const router = express.Router();
    
    router.get('/games/id/:game_id', getSpecificGame); //Get a specific game by id
    router.get('/games/name/:game_name', searchGamesByName); //Search game by name

    router.post('/groups', createGroup); //Create a group in the database
    router.delete('/groups/:group_id', removeGroup); //Remove a specific group by id

    router.get('/groups/owner/:owner', getGroups); //Get all groups from a user
    router.get('/groups', listGroups); //Get all groups
    router.get('/groups/:group_id', getGroupById); //Get a specific group
    router.put('/groups/:group_id', editGroup); //Update a specific group
    router.get('/groups/:group_id/games', getRatingsFromGames); //Get a game between the given interval of values
    
    router.put(`/groups/:group_id/games/:game_id`, addGameToGroup); //Add a specific game by id to a group
    router.delete('/groups/:group_id/games/:game_id', removeGame); //Remove a specific game by id from a group
    
    return router;     
      
    function getSpecificGame(req, res) { //Implementation of the route to get a specific game by id
        console.log("Get A Specific Game By ID")
        promisesAsyncImplementation(
            services.getSpecificGame(req.params.game_id),
            res
        );
    }

    function searchGamesByName(req, res) { //Implementation of the route to get a specificsearch for a game by name
        console.log("Search Game By Name")
        promisesAsyncImplementation(
            services.searchGamesByName(req.params.game_name),
            res
        );
    }


    function createGroup(req, res) { //Implementation of the route to create a group
        console.log("Create Group")
        promisesAsyncImplementation(
            services.createGroup(req, 'api/'),
            res
        );
    }

    function getGroups(req, res) { //Implementation of the route to get all groups
        console.log("Get Groups From A User")
        promisesAsyncImplementation(
            services.getGroups(req.params.owner),
            res
        );
    }

    function listGroups(req, res) { //Implementation of the route to get all groups
        console.log("List Groups")
        promisesAsyncImplementation(
            services.listGroups(),
            res
        );
    }

    function getGroupById(req, res) { //Implementation of the route to get a specific group
        console.log("Get A Specific Group")
        promisesAsyncImplementation(
            services.getGroupById(req.params.group_id),
            res
        );
    }

    function editGroup(req, res) { //Implementation of the route to update a specific group
        console.log("Edit Group")
        promisesAsyncImplementation(
            services.editGroup(req.params.group_id, req.body.name, req.body.desc, 'api/'),
            res
        );
    }

    function removeGroup(req,res) {    //Implementation of the route to remove a group by id
        console.log("Remove Group by ID")
        promisesAsyncImplementation(
            services.removeGroup(req.params.group_id, 'api/'),
            res
        );
    }

    function addGameToGroup(req, res) { //Implementation of the route to add a game by id to a specific group
        console.log("Add Game to Group")        
        promisesAsyncImplementation(
            services.addGameToGroup(req.params.game_id, req.params.group_id, 'api/'),
            res
        );
    }

    function getRatingsFromGames(req,res) { //Implementation of the route to get a game between the given interval of values
        console.log("Get Ratings From Games From Group")
        promisesAsyncImplementation(
            services.getRatingsFromGames(req.params.group_id, req.query.max, req.query.min),
            res
        );
    }

    function removeGame(req, res) { //Implementation of the route to delete a specific game from a group
        console.log("Remove Game By ID")
        promisesAsyncImplementation(
            services.removeGame(req.params.group_id, req.params.game_id, 'api/'),
            res
        );
    }
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
        res.json({error: err})
    });
}


