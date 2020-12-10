'use strict'

const error = require('./responses')

const Groups_Database = [] //The repository in memory

function createGroup(name, desc, processCreateGroup) {
    var group = Groups_Database.findIndex(g => g.name === name);
    if(group != -1) return processCreateGroup(error.NOT_FOUND, error.setError({ "error": "The group you inserted already exists." }))
    var group = {
        id: Groups_Database.length + 1,
        name: name,
        desc: desc,
        games: []
    }
    Groups_Database.push(group)
    return processCreateGroup(201, { "message": "Group created successfully!" })
}

function listGroups(processListGroups) {
    if(Groups_Database.length === 0) return processListGroups(error.NOT_FOUND, error.setError({ "error": "There are no groups." }))
    return processListGroups(200, Groups_Database)
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