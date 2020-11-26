'use strict'

const Groups_Database = []

function createGroup(name, desc, processCreateGroup) {
    let group = {
        name: name,
        desc: desc,
        games : []
    }
    Groups_Database.push(group)
    console.log("Group inserted ----> " + group.name)
    processCreateGroup(null, console.log("Number of groups : " + Groups_Database.length))
}


function getGroupByName(name, processGetGroup) {
    processGetGroup(null, console.log("Ok"))
}

module.exports = {
    createGroup: createGroup,
    getGroupByName: getGroupByName
}