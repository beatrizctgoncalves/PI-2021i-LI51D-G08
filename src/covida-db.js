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


module.exports = {
    createGroup: createGroup,
    getGroupWithName: getGroupWithName,
    listGroups: listGroups
}