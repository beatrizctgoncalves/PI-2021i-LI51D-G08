'use strict'

const error = require('./error')

const Groups_Database = [] //The repository in memory

function createGroup(name, desc, processCreateGroup) {
    var group = Groups_Database.findIndex(g => g.name === name);
    if(group != -1) return processCreateGroup(error.NOT_FOUND, error.setError({ "error": "The group you inserted already exists." }))
    var group = {
        name: name,
        desc: desc,
        games: []
    }
    Groups_Database.push(group)
    return processCreateGroup(201, { "message": "Group created successfully!" })
}

function getGroupWithName(name, processGetGroupByName) {
    var group = Groups_Database.filter(g => g.name === name)
    if(group == -1) return processGetGroupByName(error.NOT_FOUND, error.setError({ "error": "The group you inserted doesnt exist." }))
    return processGetGroupByName(200, group)
}

function listGroups(processListGroups) {
    if(Groups_Database.length === 0) return processListGroups(error.NOT_FOUND, error.setError({ "error": "There are no groups." }))
    return processListGroups(200, Groups_Database)
}

function addGameToGroup(game, group_name, processAddGameToGroup){
    var group = Groups_Database.findIndex(g => g.name === group_name);
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

function getRatingsFromGames(group_name, max, min, processGetRatingsFromGames) {
    var group = Groups_Database.findIndex(g => g.name === group_name)
    if(group == -1) {
        return processGetRatingsFromGames(error.NOT_FOUND, error.setError({ "error": "The group you inserted doesnt exist." }))
    }
    var games = Groups_Database[group].games;
    var games_within_rating = games.filter(g => g.total_rating >= min && g.total_rating <= max)
    return processGetRatingsFromGames(200, games_within_rating)
}

function editGroup(old_name, new_name, new_desc, processEditGroup) {
    var old_group = Groups_Database.findIndex(g => g.name === old_name)
    if(old_group == -1) {
        return processEditGroup(error.NOT_FOUND, error.setError({ "error": "The group you inserted doesnt exist." }))
    }
    Groups_Database[old_group].name = new_name;
    Groups_Database[old_group].desc = new_desc;
    return processEditGroup(200, { "message": "Group edited successfully!" })
}

function removeGameById(group_name, game_id, processRemoveGameById) {
    var group = Groups_Database.findIndex(g => g.name === group_name)
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
    getGroupByName: getGroupWithName,
    listGroups: listGroups,
    addGameToGroup: addGameToGroup,

    getRatingsFromGames: getRatingsFromGames,
    editGroup: editGroup,
    removeGameById: removeGameById,
}