'use strict'

const express = require('express');
const covidaResponses = require('./covida-responses');

module.exports = function(services) {
    if (!services) {
        throw "Invalid services object";
    }
    const router = express.Router();

    router.get('/games/name/:game_name', searchGamesByName); //Search game by name
    router.get('/toAdd/groups/:group_id/games/:game_name', searchGamesToAdd);

    router.post('/groups', createGroup); //Create a group in the database
    router.post('/groups/:group_id', removeGroup); //Remove a specific group by id

    router.get('/groups/owner/:owner', getGroups); //Get all groups from a user
    router.get('/groups/:group_id', getGroupById); //Get a specific group
    router.post('/edit/groups/:group_id', editGroup); //Update a specific group
    router.get('/groups/:group_id/games', getRatingsFromGames); //Get a game between the given interval of values
    
    router.post(`/add/groups/:group_id/games/:game_id`, addGameToGroup); //Add a specific game by id to a group
    router.post('/groups/:group_id/games/:game_id', removeGame); //Remove a specific game by id from a group

    return router;

    function searchGamesByName(req, res) { //Implementation of the route to get a specificsearch for a game by name
        console.log("Search Game By Name")
        let isNotAuth = false;
        let username = "";
        if(!req.user) isNotAuth = true;
        else username = req.user.body[0].username;
        services.searchGamesByName(req.params.game_name)
            .then(games => res.status(games.status).render('search', { 
                games: games.body,
                username: username,
                isNotAuth: isNotAuth
            }))
            .catch(err => error(err, req, res))
    }

    function searchGamesToAdd(req, res) { //Implementation of the route to get a specificsearch for a game by name
        console.log("Search Game By Name")
        const group_id = req.params.group_id
        if(!req.user) error({ status: 401, body: "You are unauthenticated, please Sign In" }, req, res)
        else {
            const username = req.user.body[0].username
            services.searchGamesByName(req.params.game_name)
                .then(games => res.status(games.status).render('addGame', { games: games.body, group_id: group_id, username: username}))
                .catch(err => error(err, req, res))
        }
    }

    function createGroup(req, res) { //Implementation of the route to create a group
        console.log("Create Group")
        services.createGroup(req, 'site/')
            .then(groupUrl => services.getGroupById(groupUrl.body.split('/groups/')[1]))
            .then(group => {
                let hasNoGames = true
                if(group.body.games.length) hasNoGames = false
                res.status(group.status).render('detailsGroup', {
                    name: group.body.name,
                    id: group.body.id,
                    games: group.body.games,
                    desc: group.body.desc,
                    username: group.body.owner,
                    hasNoGames: hasNoGames
                })
            })
            .catch(err => error(err, req, res))
    }

    function removeGroup(req, res) {    //Implementation of the route to remove a group by id
        console.log("Remove Group by ID")
        if(!req.user) error({ status: 401, body: "You are unauthenticated, please Sign In" }, req, res)
        else {
            const username = req.user.body[0].username;
            services.removeGroup(req.params.group_id, 'site/')
                .then(() => {
                    services.getGroups(username)
                        .then(groups => res.status(groups.status).render('groups', { 
                            groups: groups.body,
                            username: username
                        }))
                        .catch(err => {
                            if(err.status == covidaResponses.NOT_FOUND)  {
                                res.redirect('/account')
                            }else{
                                error(err, req, res)
                            }    
                        })
                    })
                .catch(err => error(err, req, res))
            }
    }

    function getGroups(req, res) { //Implementation of the route to get all groups
        console.log("Get Groups From A User")
        services.getGroups(req.params.owner)
            .then(groups => res.status(groups.status).render('groups', { 
                groups: groups.body,
                username: req.params.owner
            }))
            .catch(err => error(err, req, res))
    }

    function getGroupById(req, res) { //Implementation of the route to get a specific group
        console.log("Get A Specific Group")
        services.getGroupById(req.params.group_id)
            .then(group => {
                let hasNoGames = true
                if(group.body.games.length) hasNoGames = false
                res.status(group.status).render('detailsGroup', {
                    name: group.body.name,
                    id: group.body.id,
                    games: group.body.games,
                    desc: group.body.desc,
                    username: group.body.owner,
                    hasNoGames: hasNoGames
                })
            })
            .catch(err => error(err, req, res))
    }

    function editGroup(req, res) { //Implementation of the route to update a specific group
        console.log("Edit Group")
        const id = req.params.group_id
        services.editGroup(id, req.body.name, req.body.desc, 'site/')
            .then(() => services.getGroupById(id))
            .then(group => {
                let hasNoGames = true
                if(group.body.games.length) hasNoGames = false
                res.status(group.status).render('detailsGroup', {
                    name: group.body.name,
                    id: group.body.id,
                    games: group.body.games,
                    desc: group.body.desc,
                    username: group.body.owner,
                    hasNoGames: hasNoGames
                })
            })
            .catch(err => error(err, req, res))
    }

    function getRatingsFromGames(req,res) { //Implementation of the route to get a game between the given interval of values
        console.log("Get Ratings From Games From Group")
        if(!req.user) error({ status: 401, body: "You are unauthenticated, please Sign In" }, req, res)
        else {
            let isNotAuth = false;
            const username = req.user.body[0].username
            services.getRatingsFromGames(req.params.group_id, req.query.max, req.query.min)
                .then(games => res.status(games.status).render('search', {
                    games: games.body,
                    username: username,
                    isNotAuth: isNotAuth
                }))
                .catch(err => error(err, req, res))
        }
    }

    function addGameToGroup(req, res) { //Implementation of the route to add a game by id to a specific group
        console.log("Add Game to Group")      
        const id = req.params.group_id;  
        services.addGameToGroup(req.params.game_id, id, 'site/')
            .then(() => services.getGroupById(id))
            .then(group => {
                let hasNoGames = true
                if(group.body.games.length) hasNoGames = false
                res.status(group.status).render('detailsGroup', {
                    name: group.body.name,
                    id: group.body.id,
                    games: group.body.games,
                    desc: group.body.desc,
                    username: group.body.owner,
                    hasNoGames: hasNoGames
                })
            })
            .catch(err => error(err, req, res))
    }

    function removeGame(req, res) { //Implementation of the route to delete a specific game from a group
        console.log("Remove Game By ID")
        const id = req.params.group_id;
        services.removeGame(id, req.params.game_id, 'site/')
            .then(() => services.getGroupById(id))
            .then(group => {
                let hasNoGames = true
                if(group.body.games.length) hasNoGames = false
                res.status(group.status).render('detailsGroup', {
                    name: group.body.name,
                    id: group.body.id,
                    games: group.body.games,
                    desc: group.body.desc,
                    username: group.body.owner,
                    hasNoGames: hasNoGames
                })
            })
            .catch(err => error(err, req, res))
    }
}

function error(err, req, res) {
    const status = err.status || 500
    let isNotAuth = false;
    let username = "";
    if(!req.user) isNotAuth = true;
    else username = req.user.body[0].username;
    res.status(status).render('error', {
        status: err.status,
        body: err.body,
        username: username,
        isNotAuth: isNotAuth
    })
}

