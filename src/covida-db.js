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
    console.log(group)
    return processGetGroupWithName(null, group)
}

function listGroups(processListGroups) {
    return processListGroups(null,Groups_Database)
}

function addGameToGroup(group_name, game_name, processPutGameToGroup){
     var group = Groups_Database.find(match => match.group_name === group_name)
     if(!group){
         return processPutGameToGroup(
             error.create(
                 error.NOT_FOUND,
                 'Could not find group with that name ${group_name}'
             ))
     }
     
     return processPutGameToGroup(null,group)
     
 }


module.exports = {
    createGroup: createGroup,
    getGroupWithName: getGroupWithName,
    listGroups: listGroups
   // addGameToGroup : addGameToGroup
}