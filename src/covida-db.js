'use strict'

const responses = require('./responses')
const fetch = require('node-fetch')

const SERVER_URL = 'http://localhost:8080';

const Groups_Database = [{
        "id": 1,
        "name": "name",
        "desc": "desc",
        "games": []
    }] //The repository in memory

function createGroup(name, desc) {
    var group = {
        "id": Groups_Database.length + 1,
        "name": name,
        "desc": desc,
        "games": []
    }
    Groups_Database.push(group)

    return fetch(`${SERVER_URL}/groups`, {
        method: 'POST',
        headers: { //Request headers. format is the identical to that accepted by the Headers constructor (see below)
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(group) //Request body
    })
    .then(response => response.json()) //Expecting a json response
    .then(body => {
        console.log("KKKKKKKKKK")
        return body;
    })
    .catch(() => {
        return responses.setError(responses.DB_ERROR, responses.DB_ERROR_MSG)
    })
}

function listGroups() {
    if(Groups_Database.length === 0) {
        console.log("SECOND")
        return 0;
    }
    return fetch(`${SERVER_URL}/groups`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null,
        redirect: 'follow', // set to `manual` to extract redirect headers, `error` to reject redirect
    })
    .then(response => response.json()) //Expecting a json response
    .then(body => {
        console.log("KKKKKKKKKKKKKK")
        console.log(body)
        if(body.length) return body;
        else {
            console.log("333333333333333333333")
            return undefined;
        }
    })
    .catch(() => Promise.reject(responses.DB_ERROR_MSG));
}

function getGroupByID(id, processGetGroupByID) {
    var group = Groups_Database.filter(g => g.id === id)
    if(group == -1) return processGetGroupByID(error.NOT_FOUND, error.setError({ "error": "The group you inserted doesnt exist." }))
    return processGetGroupByID(200, group)
}

function editGroup(group_id, new_name, new_desc, processEditGroup) {
    var old_group = Groups_Database.findIndex(g => g.id === parseInt(group_id))
    if(old_group == -1) {
        return processEditGroup(error.NOT_FOUND, error.setError({ "error": "The group you inserted doesnt exist." }))
    }
    Groups_Database[old_group].name = new_name;
    Groups_Database[old_group].desc = new_desc;
    return processEditGroup(200, { "message": "Group edited successfully!" })
}

function removeGroup(group_id, processRemoveGroup) {
    var group = Groups_Database.findIndex(g => g.id === parseInt(group_id))
   
    if(group == -1) {
        return processRemoveGroup(error.NOT_FOUND, error.setError({ "error": "The group you inserted doesnt exist." }))
    }
    Groups_Database.splice(group, 1)
    return processRemoveGroup(200, { "message":  "Group deleted successfully!" })
}


function addGameToGroup(game, group_id, processAddGameToGroup){
    console.log(group_id)
    var group = Groups_Database.findIndex(g => g.id === parseInt(group_id));
    if(group == -1) return processAddGameToGroup(error.NOT_FOUND, error.setError({ "error": "The group you inserted doesnt exist." }))

    //Put each object of game separately because then we have just one object in games that have all of the information
    //If we didnt do this, games[] would have an object per game inserted
    var gameArray = {
        id: game[0].id,
        name: game[0].name,
        summary: game[0].summary,
        total_rating : game[0].total_rating
    }
    Groups_Database[group].games.push(gameArray);
    return processAddGameToGroup(200, { "message": "Game added successfully to the group!" })
}

function getRatingsFromGames(group_id, max, min, processGetRatingsFromGames) {
    var group = Groups_Database.findIndex(g => g.name === parseInt(group_id))
    if(group == -1) {
        return processGetRatingsFromGames(error.NOT_FOUND, error.setError({ "error": "The group you inserted doesnt exist." }))
    }
    var games = Groups_Database[group].games;
    var games_within_rating = games.filter(g => g.total_rating >= min && g.total_rating <= max)
    return processGetRatingsFromGames(200, games_within_rating)
}

function removeGameById(group_id, game_id, processRemoveGameById) {
    var group = Groups_Database.findIndex(g => g.id === parseInt(group_id))
    if(group == -1) {
        return processRemoveGameById(error.NOT_FOUND, error.setError({ "error": "The group you inserted doesnt exist." }))
    }
    var games = Groups_Database[group].games
    var gm_idx = games.findIndex(game => game.id === parseInt(game_id)) 
    if(gm_idx == -1) {
        return processRemoveGameById(error.NOT_FOUND, error.setError({ "error": "The game you inserted doesnt exist in this group." }))
    }
    games.splice(gm_idx, 1)
    return processRemoveGameById(200, { "message":  "Game deleted successfully!" })
}

module.exports = {
    createGroup: createGroup,
    listGroups: listGroups,
    getGroupByID: getGroupByID,
    editGroup: editGroup,
    removeGroup : removeGroup,

    addGameToGroup: addGameToGroup,
    getRatingsFromGames: getRatingsFromGames,
    removeGameById: removeGameById,
}