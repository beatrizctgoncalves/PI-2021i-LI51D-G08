'use strict'

 const data = require('./igdb-data.js');
 const db = require('./covida-db.js');
 const error = require('./error'); 
function getGamesWithName(game_name, cb) {
    if(!game_name){
        return cb(
            error.create(
                error.ARGUMENT_ERROR,
                'Invalid TvShow name'
        ))
    }
    data.getGamesWithName(game_name, cb)
}

function createGroup(group_name, group_desc, processCreateGroup) {
    db.getGroupWithName(group_name, processGetGroup);

    function processGetGroup(err, groupObj) {
        if (!groupObj.length) {
            db.createGroup(group_name, group_desc, cb);
        } else {
            errorMessageObj = {"error": "Group already exists"};
            processCreateGroup(err, errorMessageObj);
        }
    }
    function cb(err) {
        processCreateGroup(err, "Group created successfully");
    }
}

function listGroups(processListGroups) {
    db.listGroups(cb)
    function cb(err,groupObj) {
        processListGroups(err,groupObj)
    }
}

function getGroupWithName(group_name, processGetGroupWithName) {
    db.getGroupWithName(group_name, cb);

    function cb(err, groupObj) {
        processGetGroupWithName(err, groupObj)
    }
}

function addGameToGroup(group_name,game_name, processPutGameToGroup){
    if(!group_name){
        return processPutGameToGroup(
            error.create(
                error.ARGUMENT_ERROR, 'Please indicate a valid group name'
            )
        )
    }
    if(!game_name){
        return processPutGameToGroup(
            error.create(
                error.NOT_FOUND,
                'No game was given'
            )
        )
    }
    db.addGameToGroup(game_name, group_name, cb)
    
}



module.exports = {
    getGamesWithName: getGamesWithName,
    createGroup: createGroup,
    listGroups:listGroups,
    getGroupWithName:getGroupWithName
}
