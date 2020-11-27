'use strict'

const Groups_Database = []

function createGroup(name, desc, processCreateGroup) {
    var group = {
        name: name,
        desc: desc,
        games : []
    }
    Groups_Database.push(group)
    console.log("Group inserted ----> " + group.name)
    processCreateGroup(null, console.log("Number of groups : " + Groups_Database.length))
}

function getGroupWithName(name, processGetGroupWithName) {
    var group = Groups_Database.filter(e => {
        return e.name === name
    })
    return processGetGroupWithName(null, group)
}

function listGroups(processListGroups) {
    return processListGroups(null,Groups_Database)
}

function addGameToGroup(game_name, group_name, processAddGameToGroup){
    var group = Groups_Database.findIndex(g => g.name === group_name)
    Groups_Database[group].games.push(game_name)

    return processAddGameToGroup(null, group)
}

function editGroup(old_name, new_name, new_desc,processEditGroup) {
    var old_group = Groups_Database.findIndex(g => g.name ==  old_name)
    Groups_Database[old_group].name = new_name;
    Groups_Database[old_group].desc = new_desc;

    return processEditGroup(null,old_group)
}

function removeGame(group_name,game_name,proccessRemoveGame) {
    var group = Groups_Database.findIndex(g => g.name === group_name)
    var games = Groups_Database[group].games
    var gm_idx = games.findIndex(game => game.name === game_name) 
    
    Groups_Database[games].games = games.splice(gm_idx,1)

    return proccessRemoveGame(null,Groups_Database[group].games)
}

function getGroupDetails(group_name, processGroupDetails) {
    console.log("Groups Details : ", group_name)
    var group = Groups_Database.find(g => g.group_name === group)
    console.log(group)
    return processGroupDetails(null,group)
}

module.exports = {
    createGroup: createGroup,
    getGroupWithName: getGroupWithName,
    listGroups: listGroups,
    addGameToGroup: addGameToGroup,
    editGroup: editGroup,
    removeGame: removeGame,
    getGroupDetails : getGroupDetails
}