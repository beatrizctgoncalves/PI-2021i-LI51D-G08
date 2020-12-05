'use strict'

const Groups_Database = [] //The repository in memory

function createGroup(name, desc, processCreateGroup) {
    var group = {
        name: name,
        desc: desc,
        games: []
    }
    Groups_Database.push(group)
    
    return processCreateGroup(null, console.log("Number of groups : " + Groups_Database.length))
}

function getGroupWithName(name, processGetGroupWithName) {
    var group = Groups_Database.filter(g => g.name === name)
    
    return processGetGroupWithName(null, group)
}

function listGroups(processListGroups) {
    return processListGroups(null,Groups_Database)
}

function addGameToGroup(game, group_name, processAddGameToGroup){
    var group = Groups_Database.findIndex(g => g.name === group_name);
    //Put each object of game separately because then we have just one object in games that have all of the information
    //If we didnt do this, games[] would have an object per game inserted
    var gameArray = {
        id: game[0].id,
        name: game[0].name,
        summary: game[0].summary,
        total_rating : game[0].total_rating
    }
    Groups_Database[group].games.push(gameArray);

    processAddGameToGroup(null, group)
}

function getRatingsFromGames(group_name, max, min, processGetRatingsFromGames) {
    var group = Groups_Database.findIndex(g => g.name === group_name)
    var games = Groups_Database[group].games;
    var games_within_rating = games.filter(g => g.total_rating >= min && g.total_rating <= max)

    return processGetRatingsFromGames(null, games_within_rating)
}

function editGroup(old_name, new_name, new_desc,processEditGroup) {
    var old_group = Groups_Database.findIndex(g => g.name === old_name)
    Groups_Database[old_group].name = new_name;
    Groups_Database[old_group].desc = new_desc;

    return processEditGroup(null, old_group)
}

function removeGameById(group_name, game_name, processRemoveGameById) {
    var group = Groups_Database.findIndex(g => g.name === group_name)
    var games = Groups_Database[group].games
    var gm_idx = games.findIndex(game => game.name === game_name) 
    games = games.splice(gm_idx, 1)
    
    return processRemoveGameById(null, games)
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